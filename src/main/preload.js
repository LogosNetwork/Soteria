import sourceMapSupport from 'source-map-support'
import { writeFileSync } from 'fs'
import { remote, ipcRenderer } from 'electron'
import { createPersistedState, createSharedMutations } from 'vuex-electron'

global.sourceMapSupport = sourceMapSupport
global.writeFileSync = writeFileSync
global.remote = remote
global.ipcRenderer = ipcRenderer
global.createPersistedState = createPersistedState
global.createSharedMutations = createSharedMutations
