import { PrismaClient } from '@prisma/client';
import { hashPassword } from '@/app/libs/bcrypt'; // Hashleme fonksiyonu
import { signToken } from '@/app/libs/jwt';
import { NextRequest, NextResponse } from 'next/server';
import cookie from 'cookie';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const {
      userId,
      password,
      passwordForUser,
      role,
      checkWalletCount,
      userSystemTime,
      blockchainSelected,
      bnbBalance,
      btcBalance,
      solBalance,
      ethBalance,
      tonBalance,
      trxBalance,
      ltcBalance
    } = await req.json();

    if (!userId || !password || !role) {
      return NextResponse.json({ message: 'UserId, password, or role not provided' }, { status: 400 });
    }

    // Check if the userId already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        userId: userId
      }
    });

    if (existingUser) {
      return NextResponse.json({ message: 'UserId is already in use' }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create new user
    const user = await prisma.user.create({
      data: {
        userId,
        password: hashedPassword,
        passwordForUser, // Optional field
        role,
        createdAt: new Date(),
        checkWalletCount: parseInt(checkWalletCount, 10), // Convert to number
        userSystemTime: parseInt(userSystemTime, 10),     // Convert to number
        blockchainSelected,
        userSystemActive: true,
        bnbBalance: parseFloat(bnbBalance),                // Convert to number
        btcBalance: parseFloat(btcBalance),                // Convert to number
        solBalance: parseFloat(solBalance),                // Convert to number
        ethBalance: parseFloat(ethBalance),                // Convert to number
        tonBalance: parseFloat(tonBalance),                // Convert to number
        trxBalance: parseFloat(trxBalance),                // Convert to number
        ltcBalance: parseFloat(ltcBalance)                 // Convert to number
      }
    });

    // Generate JWT token
    const token = signToken(user.id);

    // Set cookie with the token
    const headers = new Headers();
    headers.append('Set-Cookie', cookie.serialize('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30, // 1 month
      path: '/',
    }));

    // Return successful response
    return new NextResponse(JSON.stringify({ message: 'User registered successfully', user }), {
      status: 200,
      headers
    });

  } catch (error) {
    console.error('Error in /api/register:', error);
    return NextResponse.json({ message: 'Internal server error', error }, { status: 500 });
  }
}
