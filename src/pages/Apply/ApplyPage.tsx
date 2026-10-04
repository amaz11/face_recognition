import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import faceRec from "../../assets/loginImg/Face image.jpg";
import { usePostDataMutation } from "../../service/endpoint";

const getErrorMessage = (error: any) =>
  error?.data?.error || error?.data?.message || "Something went wrong. Please try again.";

const ApplyPage = () => {
  const { token } = useParams<{ token: string }>();
  const [postData, { isLoading }] = usePostDataMutation();

  // "new" = full sign-up form (no account yet), "existing" = already has an
  // account and just wants to apply this exam to it (email only).
  const [mode, setMode] = useState<"new" | "existing">("new");
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    conpassword: "",
    address: "",
    phone: "",
  });
  const [existingEmail, setExistingEmail] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNewSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token) return;
    if (formData.password !== formData.conpassword) {
      toast.error("Password and confirm password don't match");
      return;
    }
    try {
      const res = await postData({
        endpoint: `students/singup/${token}`,
        data: formData,
      }).unwrap();

      if (res?.data) {
        toast.success("Application submitted. Continue registration in the mobile app.");
        setSubmitted(true);
      } else {
        // Backend responds 201 even when the email already has an account.
        toast.info(res?.message || "An account with this email already exists.");
        setMode("existing");
        setExistingEmail(formData.email);
      }
    } catch (error: any) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleExistingSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token) return;
    try {
      await postData({
        endpoint: `students/exist/student/exam/${token}`,
        data: { email: existingEmail },
      }).unwrap();
      toast.success("Exam added to your account. Continue registration in the mobile app.");
      setSubmitted(true);
    } catch (error: any) {
      toast.error(getErrorMessage(error));
    }
  };

  if (!token) {
    return (
      <div className="flex justify-center items-center bg-[#051725] h-screen text-white">
        This application link is invalid.
      </div>
    );
  }

  return (
    <div className="bg-[#051725]">
      <div className="mx-auto container">
        <div className="flex justify-center items-center px-6 h-screen">
          <div className="flex w-full lg:w-11/12 xl:w-3/4">
            <div
              className="lg:block hidden bg-gray-400 bg-cover rounded-l-lg w-full lg:w-1/2 h-auto"
              style={{ backgroundImage: `url('${faceRec}')` }}
            />
            <div className="bg-white p-5 rounded-lg lg:rounded-l-none w-full lg:w-1/2">
              <h3 className="pt-4 text-2xl text-center">Apply for Exam</h3>

              {submitted ? (
                <div className="px-8 py-10 text-center">
                  <p className="text-gray-700">
                    You're set. Download the mobile app and log in with your email
                    and password to finish registration (face and document
                    verification).
                  </p>
                </div>
              ) : mode === "new" ? (
                <form
                  onSubmit={handleNewSubmit}
                  className="bg-white mb-4 px-8 pt-6 pb-8 rounded"
                >
                  <div className="mb-4">
                    <label className="block mb-2 font-bold text-gray-700 text-sm">
                      Full Name
                    </label>
                    <input
                      className="shadow focus:shadow-outline px-3 py-2 border rounded w-full text-gray-700 text-sm leading-tight appearance-none focus:outline-none"
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2 font-bold text-gray-700 text-sm">
                      Email
                    </label>
                    <input
                      className="shadow focus:shadow-outline px-3 py-2 border rounded w-full text-gray-700 text-sm leading-tight appearance-none focus:outline-none"
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2 font-bold text-gray-700 text-sm">
                      Phone
                    </label>
                    <input
                      className="shadow focus:shadow-outline px-3 py-2 border rounded w-full text-gray-700 text-sm leading-tight appearance-none focus:outline-none"
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2 font-bold text-gray-700 text-sm">
                      Address
                    </label>
                    <input
                      className="shadow focus:shadow-outline px-3 py-2 border rounded w-full text-gray-700 text-sm leading-tight appearance-none focus:outline-none"
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2 font-bold text-gray-700 text-sm">
                      Password
                    </label>
                    <input
                      className="shadow focus:shadow-outline px-3 py-2 border rounded w-full text-gray-700 text-sm leading-tight appearance-none focus:outline-none"
                      type="password"
                      name="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block mb-2 font-bold text-gray-700 text-sm">
                      Confirm Password
                    </label>
                    <input
                      className="shadow focus:shadow-outline px-3 py-2 border rounded w-full text-gray-700 text-sm leading-tight appearance-none focus:outline-none"
                      type="password"
                      name="conpassword"
                      required
                      value={formData.conpassword}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4 text-center">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 focus:shadow-outline px-4 py-2 rounded-full w-full font-bold text-white focus:outline-none disabled:opacity-60"
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading ? "Submitting..." : "Apply"}
                    </button>
                  </div>
                  <p className="text-gray-500 text-xs text-center">
                    Already have an account?{" "}
                    <button
                      type="button"
                      className="text-blue-500 underline"
                      onClick={() => setMode("existing")}
                    >
                      Apply with existing account
                    </button>
                  </p>
                </form>
              ) : (
                <form
                  onSubmit={handleExistingSubmit}
                  className="bg-white mb-4 px-8 pt-6 pb-8 rounded"
                >
                  <p className="mb-4 text-gray-600 text-sm">
                    Enter the email of your existing account to apply it to this
                    exam.
                  </p>
                  <div className="mb-6">
                    <label className="block mb-2 font-bold text-gray-700 text-sm">
                      Email
                    </label>
                    <input
                      className="shadow focus:shadow-outline px-3 py-2 border rounded w-full text-gray-700 text-sm leading-tight appearance-none focus:outline-none"
                      type="email"
                      required
                      value={existingEmail}
                      onChange={(e) => setExistingEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-4 text-center">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 focus:shadow-outline px-4 py-2 rounded-full w-full font-bold text-white focus:outline-none disabled:opacity-60"
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading ? "Submitting..." : "Apply"}
                    </button>
                  </div>
                  <p className="text-gray-500 text-xs text-center">
                    New here?{" "}
                    <button
                      type="button"
                      className="text-blue-500 underline"
                      onClick={() => setMode("new")}
                    >
                      Create an account instead
                    </button>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyPage;
