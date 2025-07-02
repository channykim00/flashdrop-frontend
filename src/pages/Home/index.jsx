const Home = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h1 className="mb-6 text-center text-xl font-semibold text-gray-800">
          FlashDrop 파일 업로드
        </h1>

        <form className="space-y-5">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">이름</label>
            <input
              type="text"
              name="name"
              placeholder="제출자 이름을 입력하세요"
              className="focus:border-dodger-blue-500 focus:ring-dodger-blue-300 w-full rounded-md border border-gray-300 px-4 py-2 text-sm shadow-sm focus:ring-1 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">파일 업로드</label>

            <input
              id="file"
              type="file"
              className="sr-only"
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
            {["banner-design.png", "design-draft.jpg"].map((file, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between rounded-lg bg-gray-100 px-4 py-2"
              >
                <span className="truncate text-sm text-gray-800">{file}</span>
                <button className="text-gray-500 hover:text-gray-700">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          <div>
            <button
              type="submit"
              className="bg-dodger-blue-500 hover:bg-dodger-blue-600 focus:ring-dodger-blue-300 w-full cursor-pointer rounded-md px-4 py-2 text-center text-sm font-semibold text-white shadow focus:ring-2 focus:outline-none"
            >
              전송하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
