const Error403 = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-red-500">403 - Forbidden</h1>
      <p className="mt-4 text-gray-600">
        Bạn không có quyền truy cập trang này.
      </p>
      <button
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
        onClick={() => window.history.back()}
      >
        Quay lại
      </button>
    </div>
  );
};
export default Error403;
