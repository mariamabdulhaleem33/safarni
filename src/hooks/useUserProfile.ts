// import { useState, useEffect, useCallback } from "react";
// import toast from "react-hot-toast";
// import type { UserProfile, UpdateProfilePayload } from "../types/profile.types";
// import {
//   API_BASE_URL,
//   ALLOWED_IMAGE_TYPES,
//   MAX_IMAGE_SIZE,
// } from "../constants/profile.constants";
// import { getUserAvatar } from "../utils/profile.utils";

// interface UseUserProfileReturn {
//   user: UserProfile | null;
//   loading: boolean;
//   error: string | null;
//   uploadingImage: boolean;
//   avatarUrl: string | null;
//   isAuthenticated: boolean;
//   refetch: () => Promise<void>;
//   updateProfile: (data: UpdateProfilePayload) => Promise<void>;
//   uploadImage: (file: File) => Promise<void>;
//   logout: () => void;
// }

// export const useUserProfile = (
//   navigate?: (path: string) => void
// ): UseUserProfileReturn => {
//   const [user, setUser] = useState<UserProfile | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [uploadingImage, setUploadingImage] = useState(false);

//   const getToken = (): string | null => localStorage.getItem("token");

//   const isAuthenticated = !!getToken();

//   const fetchProfile = useCallback(async () => {
//     const token = getToken();

//     if (!token) {
//       setLoading(false);
//       setUser(null);
//       return;
//     }

//     try {
//       setLoading(true);
//       setError(null);

//       const response = await fetch(`${API_BASE_URL}/profile`, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//       });

//       if (response.ok) {
//         const data = await response.json();
//         const userData = data.data || data.user || data;
//         setUser(userData);
//       } else if (response.status === 401) {
//         setError("Session expired");
//         localStorage.removeItem("token");
//         navigate?.("/login");
//       } else {
//         setError("Failed to fetch profile");
//       }
//       // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     } catch (err) {
//       setError("Network error");
//     } finally {
//       setLoading(false);
//     }
//   }, [navigate]);

//   const updateProfile = async (data: UpdateProfilePayload): Promise<void> => {
//     const token = getToken();
//     if (!token) throw new Error("No token found");

//     const response = await fetch(`${API_BASE_URL}/profile`, {
//       method: "PUT",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//         Accept: "application/json",
//       },
//       body: JSON.stringify({
//         full_name: data.full_name,
//         email: data.email,
//       }),
//     });

//     const responseData = await response.json();

//     if (!response.ok) {
//       if (responseData.errors) {
//         const firstError = Object.values(responseData.errors)[0];
//         throw new Error(
//           Array.isArray(firstError) ? firstError[0] : String(firstError)
//         );
//       }
//       throw new Error(responseData.message || "Failed to update profile");
//     }

//     const updatedUser = responseData.data || responseData.user || responseData;
//     setUser(updatedUser);
//   };

//   const uploadImage = async (file: File): Promise<void> => {
//     const token = getToken();

//     if (!token) {
//       toast.error("Please login to upload image");
//       return;
//     }

//     if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
//       toast.error("Please select a valid image (JPEG, PNG, GIF, WebP)");
//       return;
//     }

//     if (file.size > MAX_IMAGE_SIZE) {
//       toast.error("Image size must be less than 5MB");
//       return;
//     }

//     setUploadingImage(true);

//     try {
//       const formData = new FormData();
//       formData.append("image", file);

//       const response = await fetch(`${API_BASE_URL}/profile/image`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//         },
//         body: formData,
//       });

//       const responseData = await response.json();

//       if (!response.ok) {
//         throw new Error(responseData.message || "Failed to upload image");
//       }

//       if (responseData.data) {
//         setUser((prev) =>
//           prev ? { ...prev, ...responseData.data } : responseData.data
//         );
//       } else if (responseData.user) {
//         setUser((prev) =>
//           prev ? { ...prev, ...responseData.user } : responseData.user
//         );
//       } else if (
//         responseData.image ||
//         responseData.avatar ||
//         responseData.photo
//       ) {
//         setUser((prev) =>
//           prev
//             ? {
//                 ...prev,
//                 avatar:
//                   responseData.image ||
//                   responseData.avatar ||
//                   responseData.photo,
//               }
//             : null
//         );
//       }

//       toast.success("Profile picture updated successfully!");
//     } catch (err: unknown) {
//       const message =
//         err instanceof Error ? err.message : "Failed to upload image";
//       toast.error(message);
//     } finally {
//       setUploadingImage(false);
//     }
//   };

//   const logout = () => {
//     toast.loading("Logging out...", { duration: 1500 });
//     setTimeout(() => {
//       localStorage.removeItem("token");
//       setUser(null);
//       navigate?.("/login");
//     }, 1500);
//   };

//   useEffect(() => {
//     const token = getToken();
//     if (token) {
//       fetchProfile();
//     } else {
//       setLoading(false);
//     }
//   }, [fetchProfile]);

//   return {
//     user,
//     loading,
//     error,
//     uploadingImage,
//     avatarUrl: getUserAvatar(user),
//     isAuthenticated,
//     refetch: fetchProfile,
//     updateProfile,
//     uploadImage,
//     logout,
//   };
// };

import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import type { UserProfile, UpdateProfilePayload } from "../types/profile.types";
import {
  API_BASE_URL,
  ALLOWED_IMAGE_TYPES,
  MAX_IMAGE_SIZE,
} from "../constants/profile.constants";
import { getUserAvatar } from "../utils/profile.utils";

interface UseUserProfileReturn {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
  uploadingImage: boolean;
  avatarUrl: string | null;
  isAuthenticated: boolean;
  refetch: () => Promise<void>;
  updateProfile: (data: UpdateProfilePayload) => Promise<void>;
  uploadImage: (file: File) => Promise<void>;
  logout: () => void;
}

export const useUserProfile = (
  navigate?: (path: string) => void
): UseUserProfileReturn => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const getToken = (): string | null => localStorage.getItem("authToken");

  const isAuthenticated = !!getToken();

  const fetchProfile = useCallback(async () => {
    const token = getToken();

    if (!token) {
      setLoading(false);
      setUser(null);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("data data data", data);

        const userData = data.data || data.user || data;
        setUser(userData);
      } else if (response.status === 401) {
        setError("Session expired");
        localStorage.removeItem("authToken");
        navigate?.("/login");
      } else {
        setError("Failed to fetch profile");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const updateProfile = async (data: UpdateProfilePayload): Promise<void> => {
    const token = getToken();
    if (!token) throw new Error("No token found");

    const response = await fetch(`${API_BASE_URL}/profile`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        full_name: data.full_name,
        email: data.email,
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      if (responseData.errors) {
        const firstError = Object.values(responseData.errors)[0];
        throw new Error(
          Array.isArray(firstError) ? firstError[0] : String(firstError)
        );
      }
      throw new Error(responseData.message || "Failed to update profile");
    }

    const updatedUser = responseData.data || responseData.user || responseData;
    setUser(updatedUser);
  };

  const uploadImage = async (file: File): Promise<void> => {
    const token = getToken();

    if (!token) {
      toast.error("Please login to upload image");
      return;
    }

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      toast.error("Please select a valid image (JPEG, PNG, GIF, WebP)");
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    setUploadingImage(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch(`${API_BASE_URL}/profile/image`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: formData,
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to upload image");
      }

      if (responseData.data) {
        setUser((prev) =>
          prev ? { ...prev, ...responseData.data } : responseData.data
        );
      } else if (responseData.user) {
        setUser((prev) =>
          prev ? { ...prev, ...responseData.user } : responseData.user
        );
      } else if (
        responseData.image ||
        responseData.avatar ||
        responseData.photo
      ) {
        setUser((prev) =>
          prev
            ? {
                ...prev,
                avatar:
                  responseData.image ||
                  responseData.avatar ||
                  responseData.photo,
              }
            : null
        );
      }

      toast.success("Profile picture updated successfully!");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to upload image";
      toast.error(message);
    } finally {
      setUploadingImage(false);
    }
  };

  const logout = () => {
    toast.loading("Logging out...", { duration: 1500 });
    setTimeout(() => {
      localStorage.removeItem("authToken");
      setUser(null);
      navigate?.("/");
    }, 1500);
  };

  useEffect(() => {
    const token = getToken();
    if (token) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [fetchProfile]);

  return {
    user,
    loading,
    error,
    uploadingImage,
    avatarUrl: getUserAvatar(user),
    isAuthenticated,
    refetch: fetchProfile,
    updateProfile,
    uploadImage,
    logout,
  };
};
