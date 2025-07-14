const NotFound = () => {
  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-dodger-blue-600 text-3xl font-semibold">404</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-gray-900">
          페이지를 찾을 수 없습니다
        </h1>
        <p className="mt-6 text-lg text-gray-500">
          요청하신 페이지를 찾을 수 없습니다. 주소를 다시 확인해주세요.
        </p>
      </div>
    </main>
  );
};

export default NotFound;
