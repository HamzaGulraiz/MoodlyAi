//////// For react native contact type error
// $ yarn ts:check
// node_modules/react-native-contacts/index.ts:5:30 - error TS2304: Cannot find name 'global'.

// 5 const isTurboModuleEnabled = global.__turboModuleProxy != null;
//                                ~~~~~~

// Found 1 error in node_modules/react-native-contacts/index.ts:5

declare var global: any

//Also added this to tsconfig
// "src/types/global.d.ts",

declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_ENV: string
  }
}

declare var process: {
  env: NodeJS.ProcessEnv
}
