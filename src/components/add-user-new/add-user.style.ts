import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    contentWrapper: {
      width: "100%",
    },
    tabsBar: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.grey["A400"],
      borderRight: `1px solid ${theme.palette.divider}`,
    },
    TabsWrapper: {
      display: "flex",
      flexDirection: "row",
    },
    TabsItemWrapper: {
      width: "100%",
    },
    TabsContentSection: {
      "&:first-child": {
        marginTop: 0,
      },
    },
    TabsContentTitle: {
      marginBottom: theme.spacing(1),
    },
    TabsContentHeader: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    dropzone: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "18px",
      minHeight: "150px",
      borderWidth: 2,
      borderRadius: 2,
      borderColor: "#eeeeee",
      borderStyle: "dashed",
      backgroundColor: "#fafafa",
      color: "#bdbdbd",
      outline: "none",
      cursor: "pointer",
      transition: "border .24s ease-in-out",
    },
    definedFacesList: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "flex-start",
      justifyContent: "flex-start",
    },
    definedFacesItemFailed: {
      filter: "grayscale(1)",
      opacity: "0.5",
      transition: "all 0.2s ease-in-out",

      "&:hover": {
        opacity: 1,
        filter: "grayscale(0)",
      },

      "&:hover + span": {
        opacity: 0,
        transform: "translate(-50%, -50%) scale(0.75)",
      },
    },
    definedFacesItemProcessing: {
      filter: "blur(4px)",
      opacity: "0.7",
      transition: "all 0.2s ease-in-out",

      "&:hover": {
        opacity: 1,
        filter: "blur(0px)",
      },

      "&:hover + span": {
        opacity: 0,
        transform: "translate(-50%, -50%) scale(0.75)",
      },
    },
    definedFacesItem: {
      display: "flex",
      flex: `0 0 calc(12.5% - ${theme.spacing(2)}px)`,
      height: "0",
      paddingTop: `calc(${(12.5 * 10) / 16}% - ${theme.spacing(2)}px)`,
      overflow: "hidden",
      borderRadius: "5px",
      position: "relative",
      cursor: "pointer",
      backgroundColor: theme.palette.grey["100"],
      margin: theme.spacing(1),

      [theme.breakpoints.down("md")]: {
        flex: `0 0 calc(25% - ${theme.spacing(2)}px)`,
        paddingTop: `calc(25% - ${theme.spacing(2)}px)`,
      },

      [theme.breakpoints.down("sm")]: {
        flex: `0 0 calc(33.3333% - ${theme.spacing(2)}px)`,
        paddingTop: `calc(33.3333% - ${theme.spacing(2)}px)`,
      },

      [theme.breakpoints.down("xs")]: {
        flex: `0 0 calc(50% - ${theme.spacing(2)}px)`,
        paddingTop: `calc(50% - ${theme.spacing(2)}px)`,
      },

      "& > img": {
        maxHeight: "100%",
        position: "absolute",
        left: "50%",
        top: "0",
        transform: "translateX(-50%)",
      },
    },
    definedFacesItemIcon: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%) scale(1)",
      backgroundColor: theme.palette.common.white,
      borderRadius: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      pointerEvents: "none",
      padding: theme.spacing(1),
      opacity: 1,
      transition: "all 0.2s ease-in-out",
      zIndex: 3,

      "& > *": {
        fontSize: "40px",
      },
    },
    selectedFileZone: {
      marginTop: theme.spacing(1),
    },
    selectedFile: {
      listStyle: "none",
      padding: 0,
    },
    selectedFileItem: {
      padding: theme.spacing(1.5, 6, 1.5, 1.5),
      margin: theme.spacing(0.5),
      backgroundColor: theme.palette.grey["300"],
      borderRadius: theme.spacing(0.5),
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    selectedFileAction: {
      position: "absolute",
      right: theme.spacing(1),
      top: "50%",
      transform: "translateY(-50%)",
    },
    avatarField: {
      position: "relative",
      width: "192px",
      height: "192px",
      borderRadius: "100%",
      cursor: "pointer",
      overflow: "hidden",
      border: `1px solid rgba(0, 0, 0, 0.23)`,
      margin: theme.spacing(0, "auto", 2),

      "& > input": {
        opacity: "0",
        fontSize: "0",
        border: "none",
        position: "absolute",
        width: "100%",
        height: "100%",
      },
      "& > img": {
        maxWidth: "100%",
      },
    },
    avatarFieldError: {
      borderColor: theme.palette.error.main,
      borderWidth: "1px",
    },
    SubmitBtnWrapper: {
      marginRight: theme.spacing(1),
      position: "relative",
    },
    FormFooter: {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      padding: theme.spacing(2, 0),
    },
    footer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-end",
      justifyContent: "flex-end",
      padding: theme.spacing(2, 0),
    },
    buttonProgress: {
      color: theme.palette.success.main,
      position: "absolute",
      top: "50%",
      left: "50%",
      marginTop: -12,
      marginLeft: -12,
    },
    ImageOptions: {
      opacity: 0,
      position: "absolute",
      backgroundColor: theme.palette.common.white,
      transform: "translate(-50%, -50%) scale(0.75)",
      transition: "all 0.2s ease-in-out",
      top: "50%",
      left: "50%",
      zIndex: 4,

      "$definedFacesItem:hover &": {
        opacity: 1,
        transform: "translate(-50%, -50%) scale(1)",
      },

      "&:hover": {
        backgroundColor: theme.palette.common.white,
      },
    },
    entranceHistoryGrid: {
      borderBottom: `2px solid ${theme.palette.divider}`,

      "&:last-of-type": {
        borderBottom: "none",
      },
    },
    entranceHistoryWrapper: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      padding: theme.spacing(1, 1),
    },
    entranceHistoryTime: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      marginTop: theme.spacing(1),
    },
    pagination: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      padding: theme.spacing(1, 1),
      marginTop: theme.spacing(3),
    },
    dialogHeader: {
      display: "block",
      textAlign: "center",
    },
    dialogContent: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    cameraListForm: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(2, 0),
      width: "100%",
    },
    cameraListFormBtn: {
      height: "100%",
    },
    cameraFrames: {
      width: "100%",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      maxHeight: "400px",
      overflowY: "scroll",
    },
    dialogActions: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      width: "100%",
      padding: theme.spacing(1, 3, 2),
    },
    cameraFramesItem: {
      display: "flex",
      flex: `0 0 calc(20% - ${theme.spacing(2)}px)`,
      height: "0",
      paddingTop: `calc(${(20 * 9) / 16}% - ${theme.spacing(2)}px)`,
      overflow: "hidden",
      borderRadius: "5px",
      position: "relative",
      cursor: "pointer",
      backgroundColor: theme.palette.grey["100"],
      margin: theme.spacing(1),

      [theme.breakpoints.down("md")]: {
        flex: `0 0 calc(25% - ${theme.spacing(2)}px)`,
        paddingTop: `calc(25% - ${theme.spacing(2)}px)`,
      },

      [theme.breakpoints.down("sm")]: {
        flex: `0 0 calc(33.3333% - ${theme.spacing(2)}px)`,
        paddingTop: `calc(33.3333% - ${theme.spacing(2)}px)`,
      },

      [theme.breakpoints.down("xs")]: {
        flex: `0 0 calc(50% - ${theme.spacing(2)}px)`,
        paddingTop: `calc(50% - ${theme.spacing(2)}px)`,
      },

      "& > img": {
        maxHeight: "100%",
        position: "absolute",
        left: "50%",
        top: "0",
        transform: "translateX(-50%)",
      },
    },
    cameraFramesCheckbox: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%) scale(1)",
      backgroundColor: theme.palette.common.white,
    },
  })
);

export { useStyle };
