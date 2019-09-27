var soundpack = [];
var soundIndex = [
  1,
  1.5,
  2,
  2.5,
  3,
  3.5,
  4,
  4.5,
  5,
  5.5,
  6,
  6.5,
  7,
  8,
  8.5,
  9,
  9.5,
  10,
  11,
  11.5,
  12,
  12.5,
  13,
  13.5,
  14,
  15
];
var notesData = [

];
var keys = [
  { num: 1, key: 90, type: "white" },
  { num: 1.5, key: 83, type: "black" },
  { num: 2, key: 88, type: "white" },
  { num: 2.5, key: 68, type: "black" },
  { num: 3, key: 67, type: "white" },
  { num: 4, key: 86, type: "white" },
  { num: 4.5, key: 71, type: "black" },
  { num: 5, key: 66, type: "white" },
  { num: 5.5, key: 72, type: "black" },
  { num: 6, key: 78, type: "white" },
  { num: 6.5, key: 74, type: "black" },
  { num: 7, key: 77, type: "white" },
  { num: 8, key: 81, type: "white" },
  { num: 8.5, key: 50, type: "black" },
  { num: 9, key: 87, type: "white" },
  { num: 9.5, key: 51, type: "black" },
  { num: 10, key: 69, type: "white" },
  { num: 11, key: 82, type: "white" },
  { num: 11.5, key: 53, type: "black" },
  { num: 12, key: 84, type: "white" },
  { num: 12.5, key: 54, type: "black" },
  { num: 13, key: 89, type: "white" },
  { num: 13.5, key: 55, type: "black" },
  { num: 14, key: 85, type: "white" },
  { num: 15, key: 73, type: "white" }
];

for (var i = 0; i < soundIndex.length; i++) {
  soundpack.push({
    number: soundIndex[i],
    url: "src/" + soundIndex[i] + ".mp3"
  });
}

var vm = new Vue({
  el: "#app",
  data: {
    sounddata: soundpack,
    notes: notesData,
    nowNoteId: 0,
    nextNoteId: 0,
    playingTime: 0,
    player: null,
    displayKeys: keys,
    nowPressKey: -1
  },
  methods: {
    playnote: function(id, volume) {
      if (id > 0) {
        var audioObj = $("audio[data-num='" + id + "']")[0];
        audioObj.currentTime = 0;
        audioObj.volume = volume;
        audioObj.play();
      }
    },

    getCurrentHighlight: function(id, skey) {
      console.log(id);

      if (this.nowPressKey == skey) {
        return true;
      }
      if (this.notes.length == 0) {
        return false;
      }

      var currentId = this.nowNoteId - 1;

      if (currentId < 0) {
        currentId = 0;
      }

      var num = this.notes[currentId].num;
      if (num == id) {
        return true;
      }
      return false;
    },

    addnote: function(id) {
      if (this.recordTime > 0) {
        this.notes.push({ num: id, time: this.recordTime });
      }
      this.playnote(id, 1);
    }
  }
});

$(window).keydown(function(e) {
  var key = e.which;

  vm.nowPressKey = key;

  for (var i = 0; i < vm.displayKeys.length; i++) {
    if (key == vm.displayKeys[i].key) {
      vm.addnote(vm.displayKeys[i].num);
    }
  }
});

$(window).keyup(function() {
  vm.nowPressKey = -1;
});
