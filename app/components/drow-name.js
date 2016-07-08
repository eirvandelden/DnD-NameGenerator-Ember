import Ember from 'ember';
import _number from 'lodash/number';

// Prefix format is (Female, Male, Common). Should be an adjective or verb.
var given_prefixes = [
        ["Akor","Alak", "Beloved"],
        ["Alaun","Alton", "Lightning"],
        ["Aly","Kel", "Singing"],
        ["Ang","Adin", "Beastly"],
        ["Ardul","Amal", "Blessed"],
        ["Aun", "Ant", "Crypt"],
        ["Bae", "Bar", "Fated"],
        ["Bal", "Bel", "Burning"],
        ["Belar", "Bruh", "Dart"],
        ["Briz", "Berg", "Graceful"],
        ["Chal", "Chasz", "Earth"],
        ["Char", "Kron", "Sickened"],
        ["Chess", "Cal", "Noble"],
        ["Dhaun", "Dhaun", "Infested"],
        ["Dil", "Dur", "Cold"],
        ["Dirz", "Div", "Dream"],
        ["Dris", "Riz", "Ashen"],
        ["Eclave", "Elk", "Mad"],
        ["Elvan", "Kalin", "Elven"],
        ["Elv", "Elaug", "Drow"],
        ["Erel", "Rhyl", "Eye"],
        ["Ethe", "Erth", "Mithril"],
        ["Faer", "Selds", "Forsworn"],
        ["Felyn", "Fil", "Pale"],
        ["Filf", "Phar", "Treacherous"],
        ["Gauss", "Orgoll", "Dreaded"],
        ["G'eld", "G'eld", "Friendly"],
        ["Ghaun", "Ghaun", "Accursed"],
        ["Gin", "Din", "Beserk"],
        ["Grey", "Gul", "Ghostly"],
        ["Hael", "Hatch", "Marked"],
        ["Hal", "Sol", "Nimble"],
        ["Houn", "Rik", "Magical"],
        ["Iliv", "Dip", "Warrior"],
        ["Ilm", "Ilm", "Living"],
        ["Illiam", "Im", "Devoted"],
        ["In", "Sorn", "Enchanted"],
        ["Ilph", "Ilph", "Emerald"],
        ["Irae", "Ilzt", "Mystic"],
        ["Irr", "Izz", "Masked"],
        ["Iym", "Ist", "Immortal"],
        ["Jhan", "Duag", "Shielded"],
        ["Jhael", "Gel", "Ambitious"],
        ["Jys", "Driz", "Steel"],
        ["Lael", "Llt", "Iron"],
        ["Lar", "Les", "Bound"],
        ["Lineer", "Mourn", "Legendary"],
        ["Lird", "Ryld", "Slave"],
        ["Lua", "Lyme", "Crystal"],
        ["Mal", "Malag", "Secret"],
        ["May", "Mas", "Beauty"],
        ["Micar", "Micar", "Poison"],
        ["Min", "Ran", "Second"],
        ["Mol", "Go", "Storm"],
        ["Myr", "Nym", "Skeleton"],
        ["Nath", "Mer", "Doom"],
        ["Ned", "Nad", "Mind"],
        ["Nihil", "Nal", "Horror"],
        ["Neer", "Neer", "Core"],
        ["Null", "Nil", "Tear"],
        ["Olor", "Omar", "Tattoo"],
        ["Pellan", "Relon", "North"],
        ["Phaer", "Vorn", "Honour"],
        ["Phyr", "Phyx", "Blessing"],
        ["Qualn", "Quil", "Ocean"],
        ["Quar", "Quar", "Time"],
        ["Quav", "Quev", "Friend"],
        ["Qil", "Quil", "Foe"],
        ["Rauv", "Welv", "Cave"],
        ["Ril", "Ryl", "Omen"],
        ["Sabal", "Szor", "Amber"],
        ["Sab", "Tsab", "Void"],
        ["Shi'n", "Kren", "Fool"],
        ["Shri", "Ssz", "Silk"],
        ["Shur", "Shar", "Dagger"],
        ["Shynt", "Shynt", "Invisible"],
        ["Sin", "Szin", "Festival"],
        ["Ssap", "That", "Night"],
        ["Susp", "Spir", "Wisdom"],
        ["Talab", "Tluth", "Fire"],
        ["Tal", "Tar", "Love"],
        ["Triel", "Taz", "Bat"],
        ["T'riss", "Teb", "Sword"],
        ["Ulviir", "Uhls", "Treasure"],
        ["Umrae", "Hurz", "Truth"],
        ["Vas", "Vesz", "Body"],
        ["Vic", "Vic", "Abyss"],
        ["Vier", "Val", "Darkness"],
        ["Vlon", "Wod", "Hero"],
        ["Waer", "Wehl", "Depths"],
        ["Wuyon", "Wruz", "Abased"],
        ["Xull", "Url", "Ruby"],
        ["Xun", "Xun", "Fiend"],
        ["Yas", "Yaz", "Riddle"],
        ["Zar", "Zakn", "Shadow"],
        ["Zes", "Zez", "Ancient"],
        ["Zilv", "Vuz", "Forgotten"]];

// format is (female, male, common). Should be a noun.
var given_suffixes = [
["a", "agh"],
["ace", "as"],
["ae", "aun"],
["aer", "d"],
["afae", "afein"],
["afay", "aufein"],
["ala", "launim"],
["anna", "erin"],
["arra", "atar"],
["aste"],
["avin", "aonar"],
["ayne", "al"],
["baste", "gloth"],
["breena", "antar"],
["bryn", "lyn"],
["cice", "roos"],
["cyrl", "axle"],
["da", "daer"],
["dia", "drin"],
["diira", "diirn"],
["dra", "zar"],
["driira", "driirn"],
["dril", "dorl"],
["e"],
["eari", "erd"],
["eyl"],
["ffyn", "fein"],
["fryn"],
["iara", "ica"],
["ice", "eth"],
["idil", "imar"],
["iira", "inid"],
["inidia"],
["inil", "in"],
["intra"],
["isstra", "atlab"],
["ithra", "irahc"],
["jra", "gos"],
["jss"],
["kacha", "kah"],
["kiira", "raen"],
["lay", "dyn"],
["lara", "aghar"],
["lin"],
["lochar"],
["mice", "myr"],
["mur'ss"],
["na", "nar"],
["nilee", "olil"],
["niss", "nozz"],
["nitra", "net"],
["nolu"],
["olin"],
["onia", "onim"],
["oyss", "omph"],
["qualyn"],
["quarra", "net"],
["quiri", "oj"],
["ra", "or"],
["rae", "rar"],
["raema", "orvir"],
["raena", "olvir"],
["riia", "rak"],
["ril"],
["riina", "ree"],
["ryna", "oyn"],
["ryne", "ryn"],
["shalee", "ral"],
["ssysn", "rysn"],
["stin", "trin"],
["stra", "tran"],
["tana", "ton"],
["thara", "tar"],
["thrae", "olg"],
["tree", "tel"],
["tyrr"],
["ual", "dan"],
["ue", "dor"],
["uit", "dar"],
["une", "diin"],
["uque"],
["urra", "dax"],
["va", "ven"],
["vayas"],
["vyll"],
["vyrae", "vyr"],
["wae", "hrae"],
["wiira", "hriir"],
["wyss", "hrys"],
["xae", "zaer"],
["xena", "zen"],
["xyra", "zyr"],
["yl"],
["ylene", "yln"],
["ymma", "inyon"],
["ynda", "yrd"],
["ynrae", "yraen"],
["vrae"],
["yrr"],
["zyne", "ztp"]
];

function form1() {
     var prefix = _number.random(0, given_prefixes.length -1),
         suffix = _number.random(0, given_suffixes.length -1);

    return given_prefixes[prefix][0] + given_suffixes[suffix][0];
}

function form2(){
     var prefix = _number.random(0, given_prefixes.length -1),
         suffix = _number.random(0, given_suffixes.length -1),
         suffsuffix = _number.random(0, given_suffixes.length -1);

    return given_prefixes[prefix][0] + given_suffixes[suffix][0] + given_suffixes[suffsuffix][0];
}

function form3(){
     var prefix = _number.random(0, given_prefixes.length -1),
         suffix = _number.random(0, given_suffixes.length -1),
         suffsuffix = _number.random(0, given_suffixes.length -1);

    return given_prefixes[prefix][0] + given_suffixes[suffix][0] + "'" + given_suffixes[suffsuffix][0];
}

function form4() {
     var prefix = _number.random(0, given_prefixes.length -1),
         suffix = _number.random(0, given_suffixes.length -1),
         sufprefix = _number.random(0, given_prefixes.length -1);

    return given_prefixes[prefix][0] + given_suffixes[suffix][0] + " " + given_prefixes[sufprefix][0];
}

function form5() {
     var suffix = _number.random(0, given_suffixes.length -1),
         sufprefix = _number.random(0, given_prefixes.length -1),
         sufsuffix = _number.random(0, given_suffixes.length -1);

console.log(given_suffixes[suffix]);

    return given_suffixes[suffix][0] + "'" + given_prefixes[sufprefix][0] + given_prefixes[sufsuffix][0];
}

export default Ember.Component.extend({
  setup: Ember.on('init', function () { this.setName(); }),
  actions: {
    newName() {
      this.setName();
    }
  },
  generateName() {
      var number = _number.random(1, 10);
      var name;

      switch (number) {
          case 4:
          case 5:
              name = form2();
              break;
          case 6:
          case 7:
              name = form3();
              break;
          case 8:
          case 9:
              name = form4();
              break;
          case 10:
              name = form5();
              break;
          default:
              name = form1();
              break;
      }


      return name;
  },
  setName() {
    this.set('name', this.generateName());
  }
});
