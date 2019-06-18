import sourceMapSupport from 'source-map-support'
import { writeFileSync } from 'fs'
import { remote } from 'electron'
import { createPersistedState, createSharedMutations } from 'vuex-electron'

global.sourceMapSupport = sourceMapSupport
global.writeFileSync = writeFileSync
global.remote = remote
global.createPersistedState = createPersistedState
global.createSharedMutations = createSharedMutations
