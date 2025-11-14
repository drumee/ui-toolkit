const { password } = require("../../../skeletons");

/**
* 
* @param {*} ui 
* @param {*} opt 
* @returns 
*/
function passmeter(ui, opt) {
  let fig = `${ui.fig.family}`
  const form = Skeletons.Box.Y({
    className: `${fig}__form`,
    kids: [
      password(ui, {
        placeholder: LOCALE.PASSWORD,
        name: _a.password,
        sys_pn: _a.password,
        interactive: 1,
        service: 'password-input'
      }),
      password(ui, {
        placeholder: LOCALE.PASSWORD_CONFIRM,
        name: "password2",
        sys_pn: "password2",
        interactive: 1,
        service: 'password-input'
      }),
    ]
  })
  return Skeletons.Box.Y({
    className: `${fig}__main`,
    kids: [
      form,
      Skeletons.Box.X({
        className: `${fig}__dashboard`,
        kids: [
          Skeletons.Element({
            className: `${fig}__topic`,
            content: LOCALE.PASSWORD_STRENGTH
          }),
          Skeletons.Note({
            className: `${fig}__strength-state`,
            content: "",
            sys_pn: "strength-state"
          }),
          Skeletons.Box.X({
            className: `${fig}__strength-container`,
            kids: [
              Skeletons.Element({
                className: `${fig}__strength-content`,
                sys_pn: "strength-grade"
              }),
            ]
          })
        ]
      }),
      Skeletons.Box.X({
        className: `${fig}__dashboard`,
        kids: [
          Skeletons.Button.Svg({
            ico: "checked-circle",
            className: `${fig}__message-icon`,
            content: "",
            sys_pn: "message-icon",
            state: 0
          }),
          Skeletons.Note({
            className: `${fig}__message-text`,
            content: "",
            sys_pn: "message-text"
          }),
        ]
      })
    ]
  })
};




export default passmeter