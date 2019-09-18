import sourceMapSupport from 'source-map-support'
import { writeFileSync } from 'fs'
import { remote, shell } from 'electron'
import { createPersistedState, createSharedMutations } from 'vuex-electron'

global.sourceMapSupport = sourceMapSupport
global.writeFileSync = writeFileSync
global.remote = remote
global.shell = shell
global.createPersistedState = createPersistedState
global.createSharedMutations = createSharedMutations
