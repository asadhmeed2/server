const express = require('express');
const router= express.Router()
const PlayerModule = require("./modules/player.module.js").PlayerModule;

router.post("/player", (req, res) => {
    const { name, age, country, jumps } = req.body;
    const player = new PlayerModule({
      name: name,
      country: country,
      jumps: jumps,
      age: age,
    });
    player
      .save()
      .then((data) => {
        res.status(201).send("player added to the data base");
      })
      .catch((err) => {
        res.status(400).send("player all ready exist");
      });
  });
  router.get("/players", (req, res) => {
    PlayerModule.find({}, (err, data) => {
      if (err) throw err;
      let newData=data.map(player =>{
          const tempPlayer = {id:player._id, name:player.name, country:player.country, jumps:player.jumps, age:player.age,avg:0};
        tempPlayer.avg =player.jumps.reduce((avg,cur)=>{
            return (avg+cur/player.jumps.length) || 0;
        },0)
          return tempPlayer;
      })
      res.status(201).json(newData);
    });
  });
  router.delete("/players/:id", (req, res) => {
    PlayerModule.findByIdAndRemove(req.params.id, (err, data) => {
      if (err) throw err;
      res.status(201).json(data);
    });
  });
  router.get("/", (req, res) => {
      res.status(200).send("<h1>asad</h1>");
  });
  router.put("/players/:id", (req, res) => {
    PlayerModule.findByIdAndUpdate(req.params.id,req.body, (err, data) => {
      if (err) throw err;
      PlayerModule.findById(req.params.id, (err, data) => {
          if (err)throw err;
          res.status(201).json(data);
      }) 
    });
  });


module.exports ={
    router
}