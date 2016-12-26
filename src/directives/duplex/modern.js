import { avalon } from '../../seed/core'
import { duplexInit, duplexParse, duplexDiff, valueHijack, updateView } from './share'
import { updateDataEvents } from './updateDataEvents.modern'

avalon.directive('duplex', {
    priority: 2000,
    parse: duplexParse,
    diff: duplexDiff,
    update: function(value, vdom, newVdom, afterCb) {
        vdom.vm = newVdom.vm
        var me = this
        if (!me.dom) {
            duplexInit.call(me, vdom, updateDataEvents)
        }
        afterCb.push(function() {
            updateView[me.dtype].call(me)
        })
    }
})