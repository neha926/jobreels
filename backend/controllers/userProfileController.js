// Multi-User Profile Persistence Controller
// Each mobile number gets its own isolated profile, applications, and uploaded reels.

const userProfilesDb = new Map(); // mobile -> userProfileData

export const getUserProfile = (req, res) => {
  const { mobile } = req.params;
  const cleanMobile = mobile.replace(/\D/g, "");

  const profile = userProfilesDb.get(cleanMobile);

  if (!profile) {
    return res.status(404).json({
      success: false,
      message: "New user. Profile setup required.",
      isNewUser: true
    });
  }

  res.json({
    success: true,
    data: profile
  });
};

export const saveUserProfile = (req, res) => {
  const { mobile, profileData } = req.body;
  if (!mobile || !profileData) {
    return res.status(400).json({ success: false, message: "Mobile and profile data are required." });
  }

  const cleanMobile = mobile.replace(/\D/g, "");

  const savedRecord = {
    ...profileData,
    mobile: cleanMobile,
    updatedAt: new Date().toISOString()
  };

  userProfilesDb.set(cleanMobile, savedRecord);

  res.json({
    success: true,
    message: "Profile saved successfully for mobile number " + cleanMobile,
    data: savedRecord
  });
};
