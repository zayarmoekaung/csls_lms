// csls/src/app/api/admin/users/[userId]/route.ts

import { NextResponse } from "next/server";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';

export async function PATCH(request: Request, { params }: { params: { userId: string } }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || session.user.role !== "admin") {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const { userId } = params;
    const body = await request.json();
    const { role, status } = body; // Now accepts role and status

    const dataToUpdate: { role?: string; status?: string } = {};

    if (role) {
      const validRoles = ["admin", "teacher", "student"];
      if (!validRoles.includes(role)) {
        return new NextResponse("Invalid role provided", { status: 400 });
      }
      dataToUpdate.role = role;
    }

    if (status) {
      const validStatuses = ["active", "suspended"]; // Assuming 'deleted' is a permanent removal, not a status toggle
      if (!validStatuses.includes(status)) {
        return new NextResponse("Invalid status provided", { status: 400 });
      }
      dataToUpdate.status = status;
    }

    if (Object.keys(dataToUpdate).length === 0) {
      return new NextResponse("No valid fields provided for update", { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: dataToUpdate,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true, // Include status in response
      },
    });

    if (!updatedUser) {
      return new NextResponse("User not found", { status: 404 });
    }

    return NextResponse.json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { userId: string } }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || session.user.role !== "admin") {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const { userId } = params;

    // Prevent admin from deleting their own account
    if (session.user.id === userId) {
      return new NextResponse("Cannot delete your own admin account", { status: 400 });
    }

    const deletedUser = await prisma.user.delete({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (!deletedUser) {
      return new NextResponse("User not found", { status: 404 });
    }

    return NextResponse.json({
      message: `User ${deletedUser.email} deleted successfully`,
      user: deletedUser,
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
