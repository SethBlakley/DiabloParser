const fs = require("fs");
var parseString = require("xml2js").parseString;
const xml = "./Diablo.xml";
const outputFile = "./test.txt";

fs.readFile(xml, "utf8", function (err, data) {
  if (!err) {
    parseString(data, function (err, result) {
      result.Items.Item.forEach((item) => {
        let content =
          `\n\n${item.$.Name}` +
          " - " +
          `${item.$.Type} \n ------------------------- \n\n`;
        fs.appendFile(outputFile, content, (err) => {
          if (err) {
            console.error(err);
          }
        });

        for (let i = 0; i < item.Stats[0].Stat.length; i++) {
          if (
            item.Stats[0].Stat[i].$.Value != "Ctrl + Left Click to Move" &&
            item.Stats[0].Stat[i].$.Value != "Hold Shift to Compare" &&
            !item.Stats[0].Stat[i].$.Value.includes("Durability:")
          ) {
            fs.appendFile(
              outputFile,
              `${item.Stats[0].Stat[i].$.Value} \n`,
              (err) => {
                if (err) {
                  console.error(err);
                }
              }
            );
          }
        }
      });
      fs.appendFile(
        outputFile,
        `\n\n\n\n\n\n\n\n\n\n----------NEWFILE-----------`,
        (err) => {
          if (err) {
            console.error(err);
          }
        }
      );
    });
  } else {
    console.log(err);
  }
});
