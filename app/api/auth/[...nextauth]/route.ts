import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === 'google' && profile?.email) {
        // Blokir domain yang bukan students.uin-suska.ac.id
        // Hapus atau komen kode ini jika ingin menguji dengan email biasa sementara
        return profile.email.endsWith('@students.uin-suska.ac.id');
      }
      return false; // Tolak provider lain
    },
    async session({ session }) {
      return session;
    }
  },
  pages: {
    // Arahkan error ke halaman depan atau halaman khusus
    error: '/', 
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
