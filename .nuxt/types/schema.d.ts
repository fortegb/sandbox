import { NuxtModule, ModuleDependencyMeta, RuntimeConfig } from '@nuxt/schema'
declare module '@nuxt/schema' {
  interface ModuleDependencies {
    ["@nuxtjs/tailwindcss"]?: ModuleDependencyMeta<typeof import("@nuxtjs/tailwindcss").default extends NuxtModule<infer O> ? O : Record<string, unknown>>
    ["@nuxtjs/supabase"]?: ModuleDependencyMeta<typeof import("@nuxtjs/supabase").default extends NuxtModule<infer O> ? O : Record<string, unknown>>
    ["@nuxt/devtools"]?: ModuleDependencyMeta<typeof import("@nuxt/devtools").default extends NuxtModule<infer O> ? O : Record<string, unknown>>
    ["@nuxt/telemetry"]?: ModuleDependencyMeta<typeof import("@nuxt/telemetry").default extends NuxtModule<infer O> ? O : Record<string, unknown>>
  }
  interface NuxtOptions {
    /**
     * Configuration for `@nuxtjs/tailwindcss`
     */
    ["tailwindcss"]: typeof import("@nuxtjs/tailwindcss").default extends NuxtModule<infer O, unknown, boolean> ? O : Record<string, any>
    /**
     * Configuration for `@nuxtjs/supabase`
     */
    ["supabase"]: typeof import("@nuxtjs/supabase").default extends NuxtModule<infer O, unknown, boolean> ? O : Record<string, any>
    /**
     * Configuration for `@nuxt/devtools`
     */
    ["devtools"]: typeof import("@nuxt/devtools").default extends NuxtModule<infer O, unknown, boolean> ? O : Record<string, any>
    /**
     * Configuration for `@nuxt/telemetry`
     */
    ["telemetry"]: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O, unknown, boolean> ? O : Record<string, any>
  }
  interface NuxtConfig {
    /**
     * Configuration for `@nuxtjs/tailwindcss`
     */
    ["tailwindcss"]?: typeof import("@nuxtjs/tailwindcss").default extends NuxtModule<infer O, unknown, boolean> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxtjs/supabase`
     */
    ["supabase"]?: typeof import("@nuxtjs/supabase").default extends NuxtModule<infer O, unknown, boolean> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxt/devtools`
     */
    ["devtools"]?: typeof import("@nuxt/devtools").default extends NuxtModule<infer O, unknown, boolean> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxt/telemetry`
     */
    ["telemetry"]?: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O, unknown, boolean> ? Partial<O> : Record<string, any>
    modules?: (undefined | null | false | NuxtModule<any> | string | [NuxtModule | string, Record<string, any>] | ["@nuxtjs/tailwindcss", Exclude<NuxtConfig["tailwindcss"], boolean>] | ["@nuxtjs/supabase", Exclude<NuxtConfig["supabase"], boolean>] | ["@nuxt/devtools", Exclude<NuxtConfig["devtools"], boolean>] | ["@nuxt/telemetry", Exclude<NuxtConfig["telemetry"], boolean>])[],
  }
}
declare module 'nuxt/schema' {
  interface ModuleDependencies {
    ["@nuxtjs/tailwindcss"]?: ModuleDependencyMeta<typeof import("@nuxtjs/tailwindcss").default extends NuxtModule<infer O> ? O : Record<string, unknown>>
    ["@nuxtjs/supabase"]?: ModuleDependencyMeta<typeof import("@nuxtjs/supabase").default extends NuxtModule<infer O> ? O : Record<string, unknown>>
    ["@nuxt/devtools"]?: ModuleDependencyMeta<typeof import("@nuxt/devtools").default extends NuxtModule<infer O> ? O : Record<string, unknown>>
    ["@nuxt/telemetry"]?: ModuleDependencyMeta<typeof import("@nuxt/telemetry").default extends NuxtModule<infer O> ? O : Record<string, unknown>>
  }
  interface NuxtOptions {
    /**
     * Configuration for `@nuxtjs/tailwindcss`
     * @see https://www.npmjs.com/package/@nuxtjs/tailwindcss
     */
    ["tailwindcss"]: typeof import("@nuxtjs/tailwindcss").default extends NuxtModule<infer O, unknown, boolean> ? O : Record<string, any>
    /**
     * Configuration for `@nuxtjs/supabase`
     * @see https://www.npmjs.com/package/@nuxtjs/supabase
     */
    ["supabase"]: typeof import("@nuxtjs/supabase").default extends NuxtModule<infer O, unknown, boolean> ? O : Record<string, any>
    /**
     * Configuration for `@nuxt/devtools`
     * @see https://www.npmjs.com/package/@nuxt/devtools
     */
    ["devtools"]: typeof import("@nuxt/devtools").default extends NuxtModule<infer O, unknown, boolean> ? O : Record<string, any>
    /**
     * Configuration for `@nuxt/telemetry`
     * @see https://www.npmjs.com/package/@nuxt/telemetry
     */
    ["telemetry"]: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O, unknown, boolean> ? O : Record<string, any>
  }
  interface NuxtConfig {
    /**
     * Configuration for `@nuxtjs/tailwindcss`
     * @see https://www.npmjs.com/package/@nuxtjs/tailwindcss
     */
    ["tailwindcss"]?: typeof import("@nuxtjs/tailwindcss").default extends NuxtModule<infer O, unknown, boolean> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxtjs/supabase`
     * @see https://www.npmjs.com/package/@nuxtjs/supabase
     */
    ["supabase"]?: typeof import("@nuxtjs/supabase").default extends NuxtModule<infer O, unknown, boolean> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxt/devtools`
     * @see https://www.npmjs.com/package/@nuxt/devtools
     */
    ["devtools"]?: typeof import("@nuxt/devtools").default extends NuxtModule<infer O, unknown, boolean> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxt/telemetry`
     * @see https://www.npmjs.com/package/@nuxt/telemetry
     */
    ["telemetry"]?: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O, unknown, boolean> ? Partial<O> : Record<string, any>
    modules?: (undefined | null | false | NuxtModule<any> | string | [NuxtModule | string, Record<string, any>] | ["@nuxtjs/tailwindcss", Exclude<NuxtConfig["tailwindcss"], boolean>] | ["@nuxtjs/supabase", Exclude<NuxtConfig["supabase"], boolean>] | ["@nuxt/devtools", Exclude<NuxtConfig["devtools"], boolean>] | ["@nuxt/telemetry", Exclude<NuxtConfig["telemetry"], boolean>])[],
  }
  interface RuntimeConfig {
   app: {
      buildId: string,

      baseURL: string,

      buildAssetsDir: string,

      cdnURL: string,
   },

   contentfulSpaceId: string,

   contentfulAccessToken: string,

   supabaseUrl: string,

   supabaseServiceKey: string,

   hubspotApiKey: string,

   tuyaAccessId: string,

   tuyaAccessSecret: string,

   whatsappApiKey: string,

   whatsappApiUrl: string,

   googleCalendarClientId: string,

   googleCalendarClientSecret: string,

   googleCalendarRefreshToken: string,

   nitro: {
      envPrefix: string,
   },

   supabase: {
      serviceKey: string,

      secretKey: any,
   },
  }
  interface PublicRuntimeConfig {
   supabaseUrl: string,

   supabaseAnonKey: string,

   whatsappNumber: string,

   supabase: {
      url: string,

      key: string,

      redirect: boolean,

      redirectOptions: {
         login: string,

         callback: string,

         exclude: Array<any>,

         cookieRedirect: boolean,

         saveRedirectToCookie: boolean,
      },

      cookieName: string,

      cookiePrefix: string,

      useSsrCookies: boolean,

      cookieOptions: {
         maxAge: number,

         sameSite: string,

         secure: boolean,
      },

      clientOptions: any,
   },
  }
}
declare module 'vue' {
        interface ComponentCustomProperties {
          $config: RuntimeConfig
        }
      }