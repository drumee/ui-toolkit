
require('./skin');
const Common = require("..")
export class dtk_otp extends Common {

  /**
   ** @param {object} opt
  */
  initialize(opt = {}) {
    super.initialize(opt);
    this.declareHandlers();
    this.mset({ flow: _a.y })
  }

  /**
   * 
   */
  bindPasteEvent() {
    this.ensurePart("digits").then(async (p) => {
      await Kind.waitFor('entry');
      for (let c of p.children.toArray()) {
        c.once("input:ready", () => {
          c._input[0].onpaste = (e) => {
            setTimeout(() => {
              this.debug("OM ZZZ PASTE", e, c.getValue())
              let value = c.getValue() || '';
              if (!/[0-9]{1,6}/.test(value)) {
                c.setValue("")
                return
              }
              let digits = value.split('');
              let i = c.getIndex();
              for (let d of digits) {
                if (!p.children._views[i]) continue;
                p.children._views[i].setValue(d);
                i++;
              }
              this.checkForm()
            }, 300)
          }
        })
      }
    })
  }

  /**
   * 
   */
  checkForm(api) {
    this.ensurePart("digits").then((p) => {
      let res = [];
      for (let c of p.children.toArray()) {
        let v = c.getValue()
        if (/[0-9]/.test(v)) {
          res.push(v)
        }
      }
      if (res.length >= 6) {
        if (api) {
          return this.postService(api, { otp: res.join('') }, { async: 1 })
        }
      }
    })
  }

  /**
   *
  */
  onDomRefresh() {
    this.feed(require("./skeleton").default(this));
    this.bindPasteEvent();
  }


  /**
   * @param {LetcBox} cmd
   * @param {any} args
  */
  onUiEvent(cmd, args = {}) {
    const service = args.service || cmd.get(_a.service);
    let status = cmd.status;
    this.debug(`onUiEvent service = ${service}`, args, status, cmd);
    switch (service) {
      case _a.input:
        cmd.focus();
        if (status == _e.click) {
          cmd.setValue('');
          return;
        }
        let res = [];
        this.ensurePart("digits").then((p) => {
          let i = cmd.getIndex() + 1;
          let value = cmd.getValue();
          for (let c of p.children.toArray()) {
            if (c.getIndex() < i) {
              continue;
            } else {
              if (/[0-9]/.test(value) && /[0-9]/.test(status)) {
                c.focus();
                c.setValue('')
              } else {
                cmd.setValue('');
              }
              break;
            }
          }
          this.checkForm()
        })
        break;
    }
  }


}
