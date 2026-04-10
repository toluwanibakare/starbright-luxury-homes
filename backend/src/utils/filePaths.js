const path = require("path");

const normalizeToUnixPath = (value) => value.split(path.sep).join("/");

const publicFilePath = (absoluteFilePath) => {
  const uploadsIndex = absoluteFilePath.lastIndexOf("uploads");
  if (uploadsIndex === -1) {
    return null;
  }

  return `/${normalizeToUnixPath(absoluteFilePath.slice(uploadsIndex))}`;
};

module.exports = {
  normalizeToUnixPath,
  publicFilePath
};
