import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Image from "next/image";

const UserCardServer = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="max-w-sm mx-auto p-6 rounded-xl shadow bg-red-50 text-red-600">
        Not authenticated
      </div>
    );
  }

  const { user } = session;

  return (
    <div className="max-w-sm mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="relative w-16 h-16">
          <Image
            src={user?.image || "/avatar.png"}
            alt={user?.name || "User"}
            fill
            className="rounded-full object-cover border"
          />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            {user?.name}
          </h2>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>
      </div>

      {/* Divider */}
      <div className="my-4 h-px bg-gray-200" />

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">Rendered On</span>
        <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
          Server
        </span>
      </div>
    </div>
  );
};

export default UserCardServer;
