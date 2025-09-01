import { useState } from "react";
import { FaDownload, FaUpload, FaCheckCircle } from "react-icons/fa";
import logo from "@/assets/logo.png";

export default function LandingPage() {
  const [showMacGuide, setShowMacGuide] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-gray-100">
      <header className="fixed top-0 z-10 flex w-full items-center justify-between bg-white px-8 py-4 shadow-sm">
        <div className="flex items-center gap-3">
          <a href={location.origin}>
            <img
              src={logo}
              alt="FlashDrop Logo"
              className="h-8 w-auto"
            />
          </a>
        </div>
      </header>

      <section className="flex flex-1 flex-col items-center justify-center px-6 pt-32 pb-20 text-center">
        <h1 className="mb-6 text-5xl font-extrabold text-gray-800">
          🚀 간편한 파일 전송, <span className="text-blue-600">FlashDrop</span>
        </h1>
        <p className="mb-10 max-w-2xl text-lg text-gray-600">
          클릭 몇 번으로 손쉽게 파일을 주고받으세요.
          <br />
          Windows와 Mac을 모두 지원합니다.
        </p>

        <div
          id="download"
          className="flex gap-6"
        >
          <button
            className="flex cursor-pointer items-center gap-2 rounded-2xl bg-gray-800 px-8 py-4 text-lg font-medium text-white shadow-lg hover:bg-gray-900"
            onClick={() => setShowMacGuide(true)}
          >
            <FaDownload /> Mac 다운로드
          </button>
        </div>

        {showMacGuide && (
          <div className="mt-10 max-w-xl rounded-2xl border border-gray-100 bg-white p-6 shadow-xl">
            <h2 className="mb-2 text-xl font-semibold">⚠️ Mac 보안 안내</h2>
            <p className="mb-4 text-gray-700">
              현재 FlashDrop은 코드사이닝이 완료되지 않아 실행 시 보안 경고가 표시될 수 있습니다.
              아래 명령어를 터미널에 입력하면 정상 실행이 가능합니다:
            </p>
            <div className="mb-4 overflow-x-auto rounded bg-gray-100 p-3 font-mono text-sm">
              xattr -r -d com.apple.quarantine ~/(경로)/FlashDrop.app
            </div>
            <button
              className="flex w-full cursor-pointer items-center gap-2 rounded-xl bg-gray-800 px-6 py-3 text-white shadow-lg hover:bg-gray-900"
              onClick={() =>
                window.open(
                  "https://github.com/channykim00/flashdrop-frontend/releases/tag/v1.0.0",
                  "_blank",
                )
              }
            >
              <FaDownload /> FlashDrop.dmg 다운로드
            </button>
          </div>
        )}
      </section>

      <footer className="w-full border-t bg-white py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} FlashDrop. All rights reserved.
      </footer>
    </div>
  );
}
