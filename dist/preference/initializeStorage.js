"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.existsKeyPreference = exports.getValuePreference = exports.setPreference = exports.$preference = exports.name_key_pref = void 0;
exports.name_key_pref = 'preference-activity';
if (!localStorage.getItem(exports.name_key_pref)) {
    localStorage.setItem(exports.name_key_pref, '{}');
}
exports.$preference = JSON.parse(localStorage.getItem(exports.name_key_pref));
const setPreference = (key, value) => {
    exports.$preference[key] = value;
    localStorage.setItem(exports.name_key_pref, JSON.stringify(exports.$preference));
};
exports.setPreference = setPreference;
const getValuePreference = key => exports.$preference[key];
exports.getValuePreference = getValuePreference;
const existsKeyPreference = key => (key in exports.$preference);
exports.existsKeyPreference = existsKeyPreference;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pdGlhbGl6ZVN0b3JhZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcHJlZmVyZW5jZS9pbml0aWFsaXplU3RvcmFnZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBYSxRQUFBLGFBQWEsR0FBRyxxQkFBcUIsQ0FBQztBQUVuRCxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxxQkFBYSxDQUFDLEVBQUU7SUFDdEMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxxQkFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO0NBQzdDO0FBRVksUUFBQSxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLHFCQUFhLENBQUMsQ0FBQyxDQUFDO0FBRXBFLE1BQU0sYUFBYSxHQUFHLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBQyxFQUFFO0lBQ3ZDLG1CQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO0lBQ3pCLFlBQVksQ0FBQyxPQUFPLENBQUMscUJBQWEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLG1CQUFXLENBQUMsQ0FBQyxDQUFDO0FBQ3JFLENBQUMsQ0FBQztBQUhXLFFBQUEsYUFBYSxpQkFHeEI7QUFFSyxNQUFNLGtCQUFrQixHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsbUJBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUE3QyxRQUFBLGtCQUFrQixzQkFBMkI7QUFFbkQsTUFBTSxtQkFBbUIsR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLG1CQUFXLENBQUMsQ0FBQztBQUFsRCxRQUFBLG1CQUFtQix1QkFBK0IifQ==