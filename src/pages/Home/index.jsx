import { useEffect, useState } from "react";
import { FaRegCircleCheck } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { useParams } from "react-router-dom";
import logo from "@/assets/logo.png";
import ErrorModal from "@/components/ErrorModal";
import Loading from "@/components/Loading";
import PasswordPrompt from "@/components/PasswordComponents";
import { API_URL } from "@/constants";
import { sendFileInChunksHttp } from "@/utils/sendFileInChunksHttp";

const Home = () => {
  const { uniqueUrl } = useParams();
  const [linkInfo, setLinkInfo] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [progressMap, setProgressMap] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedFiles.length === 0) {
      setError({
        title: "파일 없음",
        message: "업로드할 파일을 선택하세요.",
      });
      return;
    }

    setIsUploading(true);

    try {
      const res = await fetch(`${API_URL}/api/receive/is-online/${linkInfo.deviceId}`);
      const data = await res.json();

      if (!data.success) {
        console.error("온라인 상태 에러");
        return;
      }

      if (data.isOnline) {
        for (const { file, fileId } of selectedFiles) {
          await sendFileInChunksHttp(file, uniqueUrl, fileId, (percent) => {
            setProgressMap((prev) => ({
              ...prev,
              [fileId]: percent,
            }));
          });
        }
        console.log("업로드 완료");
      } else {
        console.log("url 주인 오프라인");
      }
    } catch (err) {
      console.error("온라인 상태 확인 중 오류:", err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files).map((file) => ({
      file,
      fileId: `${file.name}-${crypto.randomUUID()}`,
    }));
    setSelectedFiles((prev) => [...prev, ...files]);
  };

  const handleRemoveFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (!uniqueUrl) return;

    const fetchLinkInfo = async () => {
      try {
        const res = await fetch(`${API_URL}/api/receive/${uniqueUrl}`);
        if (!res.ok) {
          throw new Error("링크 정보를 가져오는 데 실패했습니다.");
        }
        const data = await res.json();
        setLinkInfo(data.link);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLinkInfo();
  }, [uniqueUrl]);

  if (!linkInfo) return <Loading />;

  if (linkInfo.requirePassword && !authenticated) {
    return (
      <PasswordPrompt
        uniqueUrl={uniqueUrl}
        onSuccess={() => setAuthenticated(true)}
      />
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-4 bg-gray-100 px-4">
      {error && (
        <ErrorModal
          errorTitle={error.title}
          errorMessage={error.message}
          onClose={() => setError(null)}
        />
      )}
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6">
        <img
          src={logo}
          alt="logo"
          className="mx-auto w-52"
        />
      </div>
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h1 className="mb-6 text-center text-xl font-semibold text-gray-800">{linkInfo.title}</h1>

        <form
          className="space-y-5"
          onSubmit={handleSubmit}
        >
          {linkInfo?.link?.requireSenderName && (
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">이름</label>
              <input
                type="text"
                name="name"
                placeholder="제출자 이름을 입력하세요"
                className="focus:border-dodger-blue-500 focus:ring-dodger-blue-300 w-full rounded-md border border-gray-300 px-4 py-2 text-sm shadow-sm focus:ring-1 focus:outline-none"
              />
            </div>
          )}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">파일 업로드</label>
            <input
              id="file"
              type="file"
              className="sr-only"
              onChange={handleFileChange}
              multiple
            />
            <label
              htmlFor="file"
              className="flex min-h-[150px] cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 px-6 py-8 text-center hover:bg-gray-100"
            >
              <p className="mb-1 text-sm font-medium text-gray-700">파일을 여기로 드롭하거나</p>
              <span className="inline-block rounded-md border border-gray-300 px-4 py-1 text-sm text-gray-600">
                파일 선택
              </span>
            </label>
          </div>

          <div className="space-y-3">
            {selectedFiles.map(({ file, fileId }, idx) => {
              const progress = progressMap[fileId] || 0;

              return (
                <div
                  key={idx}
                  className="flex flex-col gap-1 rounded-lg bg-gray-100 px-4 py-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="truncate text-sm text-gray-800">{file.name}</span>
                    <button
                      type="button"
                      className="cursor-pointer text-gray-500 hover:text-gray-700"
                      onClick={() => handleRemoveFile(idx)}
                    >
                      {progress === 100 ? (
                        <FaRegCircleCheck className="text-green-500" />
                      ) : (
                        <IoCloseSharp />
                      )}
                    </button>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded bg-gray-200">
                    <div
                      className="bg-dodger-blue-500 h-full transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div>
            <button
              type="submit"
              disabled={isUploading}
              className={`w-full cursor-pointer rounded-md px-4 py-2 text-center text-sm font-semibold text-white shadow focus:ring-2 focus:outline-none ${
                isUploading
                  ? "cursor-not-allowed bg-gray-300"
                  : "bg-dodger-blue-500 hover:bg-dodger-blue-600 focus:ring-dodger-blue-300"
              }`}
            >
              {isUploading ? "업로드 중..." : "전송하기"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
