import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";

interface VerifyEmailPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function VerifyEmailPage({
  searchParams,
}: VerifyEmailPageProps) {
  let message = "Memverifikasi alamat email Anda...";
  let description = "Harap tunggu sementara kami mengonfirmasi email Anda.";
  let verified = false;

  if (searchParams.token) {
    const user = await prisma.user.findUnique({
      where: {
        email_verify_token: searchParams.token as string,
      },
    });

    if (!user) {
      message = "Verifikasi Gagal";
      description =
        "Kami tidak dapat menemukan akun Anda. Harap periksa email Anda untuk tautan verifikasi yang benar.";
    } else {
      await prisma.user.update({
        where: {
          email_verify_token: searchParams.token as string,
        },
        data: {
          email_verified: true,
          email_verify_token: null,
        },
      });

      message = "Email Berhasil Diverifikasi!";
      description = `Akun Anda (${user.email}) telah diaktifkan.`;
      verified = true;
    }
  } else {
    message = "Kesalahan Verifikasi";
    description =
      "Tidak ada token verifikasi yang diberikan. Harap periksa email Anda dan gunakan tautan yang kami kirimkan.";
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="pb-2 text-center">
          <div className="mx-auto mb-4">
            {verified ? (
              <div className="h-24 w-24 rounded-full bg-green-100 mx-auto flex items-center justify-center">
                <CheckCircle className="h-16 w-16 text-green-600" />
              </div>
            ) : (
              <div className="h-24 w-24 rounded-full bg-amber-100 mx-auto flex items-center justify-center">
                <AlertCircle className="h-16 w-16 text-amber-600" />
              </div>
            )}
          </div>
          <CardTitle className="text-2xl font-bold">{message}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-600 mt-2">{description}</p>
        </CardContent>
        <CardFooter className="flex justify-center pt-2 pb-6">
          {verified ? (
            <Link
              href="/signin"
              className="bg-primary text-white shadow-sm w-full py-3 text-center rounded-lg font-medium transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Masuk ke akun Anda
            </Link>
          ) : (
            <div className="space-y-4 w-full">
              <Link
                href="/signin"
                className="bg-primary text-white shadow-sm w-full py-3 text-center rounded-lg font-medium transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 inline-block"
              >
                Coba masuk
              </Link>
              <Link
                href="/"
                className="text-primary bg-white border border-primary w-full py-3 text-center rounded-lg font-medium transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 inline-block"
              >
                Kembali ke halaman utama
              </Link>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
