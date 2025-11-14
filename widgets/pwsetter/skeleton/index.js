
/**
* 
* @param {*} ui 
* @param {*} opt 
* @returns 
*/
function passmeter(ui, opt) {
  let fig = `${ui.fig.family}`
  return Skeletons.Box.Y({
    className: `${fig}__main`,
    kids: [
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
      Skeletons.Note({
        className: `${fig}__error`,
        content: "",
        sys_pn: "error-message"
      }),
    ]
  })
};




export default passmeter