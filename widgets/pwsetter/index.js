

require('./skin');

export class dtk_pwmeter extends LetcBox {

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
  onDomRefresh() {
    this.feed(require('./skeleton').default(this));
  }

  /**
   * 
   * @param {*} pw 
   */
  check(pw) {
    let rate = 100 * (pw.length / 20) + 5;
    if (rate > 100) rate = 100;
    this.__strengthGrade.el.style.width = `${rate}%`;
    let min = 6;
    this._isValid = 0;
    if (pw.length < min) {
      this.__strengthState.set({ content: LOCALE.WEAK })
      this.__strengthGrade.el.dataset.strenght = "0";
      this.__errorMessage.set({ content: LOCALE.PASSWORD_AT_LEAST.format(min) })
    } else if (pw.length <= 10) {
      this.__strengthState.set({ content: LOCALE.STRONG })
      this.__strengthGrade.el.dataset.strenght = "1";
      this.__errorMessage.set({ content: "" })
      this._isValid = 1;
    } else {
      this.__strengthGrade.el.dataset.strenght = "2";
      this.__strengthState.set({ content: LOCALE.VERY_STRONG })
      this.__errorMessage.set({ content: "" });
      this._isValid = 1;
    }
  }

  /**
   * 
   * @returns 
   */
  isValid(){
    return this._isValid
  }
  
  /**
   * 
   * @param {*} pw 
   */
  message(content) {
    this.__errorMessage.set({ content })
  }

  /**
   * @param {LetcBox} cmd
   * @param {any} args
  */
  onUiEvent(cmd, args = {}) {
    const service = args.service || cmd.mget(_a.service);
    this.debug(`onUiEvent service = ${service}`, cmd, this);

    switch (service) {
      default:
        this.triggerHandlers({ service })
    }
  }

}
