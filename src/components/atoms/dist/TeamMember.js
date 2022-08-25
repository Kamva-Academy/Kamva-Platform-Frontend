"use strict";
exports.__esModule = true;
var material_1 = require("@mui/material");
var MoreVert_1 = require("@mui/icons-material/MoreVert");
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var AreYouSure_1 = require("../../components/Dialog/AreYouSure");
var events_1 = require("../../redux/slices/events");
var events_2 = require("../../redux/slices/events");
var TeamInfo = function (_a) {
    var memberId = _a.memberId, firstName = _a.firstName, lastName = _a.lastName, teamId = _a.teamId, teamHead = _a.teamHead, makeTeamHead = _a.makeTeamHead, removeFromTeam = _a.removeFromTeam;
    var _b = react_1["default"].useState(null), anchorEl = _b[0], setAnchorEl = _b[1];
    var openMenu = Boolean(anchorEl);
    var handleClick = function (event) {
        setAnchorEl(event.currentTarget);
    };
    var handleClose = function () {
        setAnchorEl(null);
    };
    var _c = react_1.useState(false), removeTeamMemberDialog = _c[0], setRemoveTeamMemberDialog = _c[1];
    var submitRemoveFromTeam = function () {
        removeFromTeam({ receipt: memberId });
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(material_1.Stack, { direction: 'row', key: memberId, alignItems: 'start', justifyContent: 'space-between' },
            react_1["default"].createElement(material_1.FormControlLabel, { control: react_1["default"].createElement(material_1.Checkbox, { checked: teamHead == memberId, onClick: function () {
                        makeTeamHead({ receipt: memberId, teamId: teamId });
                    }, color: "primary" }), label: firstName + " " + lastName === ' ' ? 'بی‌نام!' : firstName + " " + lastName, labelPlacement: "end" }),
            react_1["default"].createElement(material_1.IconButton, { onClick: handleClick },
                react_1["default"].createElement(MoreVert_1["default"], null)),
            react_1["default"].createElement(material_1.Menu, { anchorEl: anchorEl, open: openMenu, onClose: handleClose },
                react_1["default"].createElement(material_1.MenuItem, { onClick: function () {
                        setRemoveTeamMemberDialog(true);
                        handleClose();
                    } }, 'حذف از تیم'))),
        react_1["default"].createElement(AreYouSure_1["default"], { open: removeTeamMemberDialog, handleClose: function () { return setRemoveTeamMemberDialog(false); }, callBackFunction: submitRemoveFromTeam })));
};
exports["default"] = react_redux_1.connect(null, {
    removeFromTeam: events_1.removeFromTeamAction,
    makeTeamHead: events_2.makeTeamHeadAction
})(TeamInfo);
