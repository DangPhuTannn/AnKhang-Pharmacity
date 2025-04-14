
const Error404 = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold text-red-600">
        404 - Không tìm thấy trang
      </h1>
      <p className="text-gray-600 mt-2">
        Trang bạn tìm không tồn tại hoặc đã bị xóa.
      </p>
      <div
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer"
        onClick={() => window.history.back()}
      >
        Quay lại trang
      </div>
    </div>
  );
};

export default Error404;
