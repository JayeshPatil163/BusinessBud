import passport from "passport";
import {
  Strategy as GoogleStrategy,
  Profile,
  VerifyCallback,
} from "passport-google-oauth20";
import { env } from "./env";
import { prisma } from "./database";

passport.use(
  new GoogleStrategy(
    {
      clientID: env.google.clientId,
      clientSecret: env.google.clientSecret,
      callbackURL: env.google.callbackUrl,
      scope: ["profile", "email"],
    },
    async (
      _accessToken: string,
      _refreshToken: string,
      profile: Profile,
      done: VerifyCallback
    ) => {
      try {
        const email =
          profile.emails?.[0]?.value;
        const avatarUrl = profile.photos?.[0]?.value;
        const displayName = profile.displayName || "User";

        if (!email) {
          return done(new Error("No email returned from Google"), undefined);
        }

        // Upsert user: find by googleId or email
        let user = await prisma.user.findFirst({
          where: {
            OR: [{ googleId: profile.id }, { email }],
          },
        });

        if (user) {
          // Update googleId and avatar if not set
          user = await prisma.user.update({
            where: { id: user.id },
            data: {
              googleId: user.googleId ?? profile.id,
              avatarUrl: avatarUrl ?? user.avatarUrl,
            },
          });
        } else {
          // Create new user with auto-generated username from display name
          const baseUsername = displayName
            .toLowerCase()
            .replace(/[^a-z0-9]/g, "_")
            .substring(0, 20);

          // Ensure username uniqueness
          let username = baseUsername;
          let count = 1;
          while (await prisma.user.findUnique({ where: { username } })) {
            username = `${baseUsername}_${count++}`;
          }

          user = await prisma.user.create({
            data: {
              email,
              username,
              googleId: profile.id,
              avatarUrl,
            },
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error as Error, undefined);
      }
    }
  )
);

export default passport;
