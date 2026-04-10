const fs = require("fs");
const path = require("path");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const { sendSuccess } = require("../utils/apiResponse");
const {
  allowedCategories,
  allowedPropertyStatuses,
  assert,
  requireFields,
  toBoolean,
  toNullableNumber
} = require("../utils/validation");
const { generateUniquePropertySlug } = require("../utils/slug");
const {
  createProperty,
  updateProperty,
  deleteProperty,
  getAllProperties,
  getPropertyById,
  getPropertyBySlug
} = require("../models/propertyModel");
const {
  createMediaRecord,
  getMediaById,
  deleteMediaById
} = require("../models/mediaModel");
const { publicFilePath } = require("../utils/filePaths");

const buildPropertyPayload = async (body, existing = null) => {
  requireFields(body, [
    "title",
    "description",
    "price",
    "location",
    "address",
    "category",
    "property_type",
    "status",
    "verification_status",
    "size_value",
    "size_unit",
    "listing_code",
    "documents_info",
    "inspection_info"
  ]);

  assert(
    allowedCategories.includes(body.category),
    400,
    "Invalid property category."
  );
  assert(
    allowedPropertyStatuses.includes(body.status),
    400,
    "Invalid property status."
  );

  const price = Number(body.price);
  const sizeValue = Number(body.size_value);
  const bedrooms = toNullableNumber(body.bedrooms);
  const bathrooms = toNullableNumber(body.bathrooms);
  const toilets = toNullableNumber(body.toilets);

  assert(Number.isFinite(price) && price >= 0, 400, "Price must be a valid number.");
  assert(
    Number.isFinite(sizeValue) && sizeValue >= 0,
    400,
    "size_value must be a valid number."
  );
  assert(!Number.isNaN(bedrooms), 400, "bedrooms must be a valid number or null.");
  assert(!Number.isNaN(bathrooms), 400, "bathrooms must be a valid number or null.");
  assert(!Number.isNaN(toilets), 400, "toilets must be a valid number or null.");

  return {
    title: body.title.trim(),
    slug: await generateUniquePropertySlug(body.title, existing ? existing.id : null),
    description: body.description.trim(),
    price,
    location: body.location.trim(),
    address: body.address.trim(),
    category: body.category,
    property_type: body.property_type.trim(),
    status: body.status,
    is_featured: toBoolean(body.is_featured),
    verification_status: body.verification_status.trim(),
    bedrooms,
    bathrooms,
    toilets,
    size_value: sizeValue,
    size_unit: body.size_unit.trim(),
    listing_code: body.listing_code.trim(),
    documents_info: body.documents_info.trim(),
    inspection_info: body.inspection_info.trim()
  };
};

const listProperties = asyncHandler(async (req, res) => {
  const properties = await getAllProperties();
  return sendSuccess(res, 200, "Properties fetched successfully.", properties);
});

const getProperty = asyncHandler(async (req, res) => {
  const property = await getPropertyById(req.params.id);
  if (!property) {
    throw new ApiError(404, "Property not found.");
  }

  return sendSuccess(res, 200, "Property fetched successfully.", property);
});

const getPropertyBySlugController = asyncHandler(async (req, res) => {
  const property = await getPropertyBySlug(req.params.slug);
  if (!property) {
    throw new ApiError(404, "Property not found.");
  }

  return sendSuccess(res, 200, "Property fetched successfully.", property);
});

const createPropertyController = asyncHandler(async (req, res) => {
  const payload = await buildPropertyPayload(req.body);
  const propertyId = await createProperty(payload);
  const property = await getPropertyById(propertyId);

  return sendSuccess(res, 201, "Property created successfully.", property);
});

const updatePropertyController = asyncHandler(async (req, res) => {
  const existing = await getPropertyById(req.params.id);
  if (!existing) {
    throw new ApiError(404, "Property not found.");
  }

  const payload = await buildPropertyPayload(req.body, existing);
  await updateProperty(req.params.id, payload);
  const property = await getPropertyById(req.params.id);

  return sendSuccess(res, 200, "Property updated successfully.", property);
});

const deletePropertyController = asyncHandler(async (req, res) => {
  const property = await getPropertyById(req.params.id);
  if (!property) {
    throw new ApiError(404, "Property not found.");
  }

  await deleteProperty(req.params.id);
  return sendSuccess(res, 200, "Property deleted successfully.");
});

const uploadPropertyImages = asyncHandler(async (req, res) => {
  const property = await getPropertyById(req.params.id);
  if (!property) {
    throw new ApiError(404, "Property not found.");
  }

  assert(req.files && req.files.length > 0, 400, "At least one image file is required.");

  const uploaded = [];
  for (const file of req.files) {
    const mediaId = await createMediaRecord({
      property_id: req.params.id,
      file_type: "image",
      file_path: publicFilePath(file.path),
      file_name: file.filename,
      mime_type: file.mimetype
    });

    uploaded.push({
      id: mediaId,
      file_type: "image",
      file_path: publicFilePath(file.path),
      file_name: file.filename,
      mime_type: file.mimetype
    });
  }

  return sendSuccess(res, 201, "Property images uploaded successfully.", uploaded);
});

const uploadPropertyVideo = asyncHandler(async (req, res) => {
  const property = await getPropertyById(req.params.id);
  if (!property) {
    throw new ApiError(404, "Property not found.");
  }

  assert(req.file, 400, "A video file is required.");

  const mediaId = await createMediaRecord({
    property_id: req.params.id,
    file_type: "video",
    file_path: publicFilePath(req.file.path),
    file_name: req.file.filename,
    mime_type: req.file.mimetype
  });

  return sendSuccess(res, 201, "Property video uploaded successfully.", {
    id: mediaId,
    file_type: "video",
    file_path: publicFilePath(req.file.path),
    file_name: req.file.filename,
    mime_type: req.file.mimetype
  });
});

const deleteMediaController = asyncHandler(async (req, res) => {
  const media = await getMediaById(req.params.id);
  if (!media) {
    throw new ApiError(404, "Media not found.");
  }

  const absolutePath = path.join(process.cwd(), media.file_path.replace(/^\//, ""));
  if (fs.existsSync(absolutePath)) {
    fs.unlinkSync(absolutePath);
  }

  await deleteMediaById(req.params.id);
  return sendSuccess(res, 200, "Media deleted successfully.");
});

module.exports = {
  listProperties,
  getProperty,
  getPropertyBySlugController,
  createPropertyController,
  updatePropertyController,
  deletePropertyController,
  uploadPropertyImages,
  uploadPropertyVideo,
  deleteMediaController
};
