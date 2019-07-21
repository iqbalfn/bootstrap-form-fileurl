/**
 * --------------------------------------------------------------------------
 * Bootstrap Form File URL (v0.0.1): form-fileurl.js
 * Licensed under MIT (https://github.com/iqbalfn/bootstrap-form-fileurl/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

import $ from 'jquery'
import Util from './util'

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME               = 'fileurl'
const VERSION            = '0.0.1'
const DATA_KEY           = 'bs.fileurl'
const EVENT_KEY          = `.${DATA_KEY}`
const DATA_API_KEY       = '.data-api'
const JQUERY_NO_CONFLICT = $.fn[NAME]

const Default = {
    filePicker  : (cb, btn, input) => { cb( prompt('File URL') ) }
}

const DefaultType = {
    filePicker  : '(string|function)'
}

const Event = {
    CLICK_DATA_API      : `click${EVENT_KEY}${DATA_API_KEY}`
}

const ClassName = {}

const Selector = {
    DATA_TOGGLE    : '[data-toggle="fileurl"]'
}

/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class FileURL {
    constructor(element, config) {
        this._config        = this._getConfig(config)
        this._element       = element
        this._model         = null

        this._filePicker    = this._config.filePicker
        if(typeof this._filePicker === 'string')
            this._filePicker = window[this._filePicker]

        const selector = Util.getSelectorFromElement(element)
        if (selector)
            this._model = document.querySelector(selector)
        this._addElementListener()
    }

    // Getters

    static get VERSION() {
        return VERSION
    }

    static get Default() {
        return Default
    }

    // Public

    dispose() {
        $(this._element).off(EVENT_KEY)

        $.removeData(this._element, DATA_KEY)

        this._config                = null
        this._element               = null
        this._model                 = null
    }

    // Private

    _addElementListener(){
        $(this._element).on(Event.CLICK_DATA_API, e => {
            this._filePicker(res => $(this._model).val(res), this._element, this._model)
        })
    }

    _getConfig(config) {
        config = {
            ...Default,
            ...config
        }
        Util.typeCheckConfig(NAME, config, DefaultType)
        return config
    }

    // Static

    static _jQueryInterface(config, relatedTarget) {
        return this.each(function () {
            let data = $(this).data(DATA_KEY)
            const _config = {
                ...Default,
                ...$(this).data(),
                ...typeof config === 'object' && config ? config : {}
            }

            if (!data) {
                data = new FileURL(this, _config)
                $(this).data(DATA_KEY, data)
            }
        })
    }
}

/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */

$(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
    let data = $(this).data(DATA_KEY)
    if(data)
        return

    const config = $(this).data()

    FileURL._jQueryInterface.call($(this), config, this)
})

/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 */

$.fn[NAME] = FileURL._jQueryInterface
$.fn[NAME].Constructor = FileURL
$.fn[NAME].noConflict = () => {
  $.fn[NAME] = JQUERY_NO_CONFLICT
  return FileURL._jQueryInterface
}

export default FileURL