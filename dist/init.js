"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tabris_1 = require("tabris");
tabris_1.app.registerFont('Roboto Slab', '../assets/fonts/RobotoSlab-VariableFont_wght.ttf');
String.prototype.toCapitalize = function () {
    let nw = '';
    for (let i = 0, isNextUpper = false, str; i < this.length; i++) {
        str = this[i];
        if (i === 0 || isNextUpper) {
            nw += str.toUpperCase();
            isNextUpper = false;
        }
        else if (/\s/.test(str)) {
            isNextUpper = true;
            nw += str;
        }
        else {
            nw += str;
        }
    }
    return nw;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9pbml0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUNBQTBCO0FBRTFCLFlBQUcsQ0FBQyxZQUFZLENBQUMsYUFBYSxFQUFFLGtEQUFrRCxDQUFDLENBQUM7QUFFcEYsTUFBTSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEdBQUc7SUFDNUIsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDO0lBQ1osS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsV0FBVyxHQUFHLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDNUQsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNkLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxXQUFXLEVBQUU7WUFDeEIsRUFBRSxJQUFJLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUN4QixXQUFXLEdBQUcsS0FBSyxDQUFDO1NBQ3ZCO2FBQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3ZCLFdBQVcsR0FBRyxJQUFJLENBQUM7WUFDbkIsRUFBRSxJQUFJLEdBQUcsQ0FBQztTQUNiO2FBQU07WUFDSCxFQUFFLElBQUksR0FBRyxDQUFDO1NBQ2I7S0FDSjtJQUNELE9BQU8sRUFBRSxDQUFDO0FBQ2QsQ0FBQyxDQUFDIn0=