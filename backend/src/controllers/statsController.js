const { query } = require("../config/database");
const asyncHandler = require("../utils/asyncHandler");
const { sendSuccess } = require("../utils/apiResponse");

const getStats = asyncHandler(async (req, res) => {
  const [propertyCount] = await query("SELECT COUNT(*) AS total FROM properties");
  const [availableCount] = await query("SELECT COUNT(*) AS total FROM properties WHERE status = 'available'");
  const [soldCount] = await query("SELECT COUNT(*) AS total FROM properties WHERE status = 'sold'");
  const [pendingCount] = await query("SELECT COUNT(*) AS total FROM properties WHERE status IN ('draft','hidden')");

  const categoryBreakdown = await query(
    "SELECT category, COUNT(*) AS count FROM properties GROUP BY category"
  );

  const [inquiryCount] = await query("SELECT COUNT(*) AS total FROM inquiries");
  const [unreadInquiryCount] = await query("SELECT COUNT(*) AS total FROM inquiries WHERE is_read = 0");

  const [commentCount] = await query("SELECT COUNT(*) AS total FROM comments");
  const [pendingCommentCount] = await query("SELECT COUNT(*) AS total FROM comments WHERE status = 'pending'");

  const monthlyInquiries = await query(`
    SELECT
      DATE_FORMAT(created_at, '%Y-%m') AS month,
      COUNT(*) AS inquiries
    FROM inquiries
    WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
    GROUP BY DATE_FORMAT(created_at, '%Y-%m')
    ORDER BY month ASC
  `);

  const monthlyComments = await query(`
    SELECT
      DATE_FORMAT(created_at, '%Y-%m') AS month,
      COUNT(*) AS comments
    FROM comments
    WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
    GROUP BY DATE_FORMAT(created_at, '%Y-%m')
    ORDER BY month ASC
  `);

  const data = {
    properties: {
      total: Number(propertyCount.total),
      available: Number(availableCount.total),
      sold: Number(soldCount.total),
      pending: Number(pendingCount.total),
      byCategory: categoryBreakdown.map((row) => ({
        category: row.category,
        count: Number(row.count),
      })),
    },
    inquiries: {
      total: Number(inquiryCount.total),
      unread: Number(unreadInquiryCount.total),
    },
    comments: {
      total: Number(commentCount.total),
      pending: Number(pendingCommentCount.total),
    },
    trends: {
      monthlyInquiries: monthlyInquiries.map((row) => ({
        month: row.month,
        inquiries: Number(row.inquiries),
      })),
      monthlyComments: monthlyComments.map((row) => ({
        month: row.month,
        comments: Number(row.comments),
      })),
    },
  };

  sendSuccess(res, 200, "Admin stats retrieved successfully", data);
});

module.exports = { getStats };
