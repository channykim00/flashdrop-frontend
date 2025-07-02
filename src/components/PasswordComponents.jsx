import { useState } from "react";
import logo from "@/assets/logo.png";
import { API_URL } from "@/constants";

const PasswordPrompt = ({ uniqueUrl, onSuccess }) => {
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await fetch(`${API_URL}/api/receive/verify-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uniqueUrl, password: passwordInput }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setPasswordError("");
        onSuccess();
      } else {
        setPasswordError(data.message || "비밀번호가 올바르지 않습니다.");
      }
    } catch (err) {
      setPasswordError(err?.message || "비밀번호 확인 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <img
          src={logo}
          alt="logo"
          className="mx-auto mb-4 w-40"
        />
        <h2 className="mb-4 text-center text-lg font-semibold text-gray-800">
          비밀번호가 필요합니다
        </h2>

        <input
          type="password"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
          placeholder="비밀번호 입력"
          className="focus:ring-dodger-blue-300 mb-3 w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:ring focus:outline-none"
        />

        {passwordError && <p className="mb-2 text-sm text-red-500">{passwordError}</p>}

        <button
          onClick={handleSubmit}
          className="bg-dodger-blue-500 hover:bg-dodger-blue-600 w-full rounded-md px-4 py-2 text-sm font-semibold text-white shadow"
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default PasswordPrompt;
