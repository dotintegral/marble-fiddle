export const marble = {
  width: 32,
  height: 32,
  borderRadius: "100%",
  textAlign: "center",
  lineHeight: "32px",
  margin: "2px 3px",
  border: "solid 1px black",
  fontFamily: "'Source Code Pro', monospace"
};

export const marbleNumber = {
  background: "#7777ff"
};

export const marbleString = {
  background: "#99ff99"
};

export const marbleCreated = {
  background: "#ffff99"
};

export const marbleGeneric = {
  background: "white"
};

export const hiddenMarble = {
  height: 34,
  width: 40,
  margin: "2px 0",
  position: "relative",

  "&:before": {
    content: '""',
    display: "block",
    position: "absolute",
    top: 17,
    width: 38,
    height: 1,
    background: "#eeeeee"
  }
};
