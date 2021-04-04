import Materals from '../models/materals';


export function getMaterals(req, res) {
  // console.log(req.params.LeafId)
  Materals.findOne({ leafId: req.params.LeafId },{filepath: 0 }).exec((err, results) => {
    if (err) {
      console.error(err)
      res.status(500).send(err);
    }
    console.log(results)
    res.json({ results });
  });
}

export function getSearchResult(req,res) {

  // console.log('======= In getSearchResult controller ========== ');
  // console.log(req.params);
  // for test，find only one result
  Materals.findOne().where('name').equals(new RegExp(req.params.searchMessage, 'i')).exec((err, results) => {
    if (err) {
      console.error(err)
      res.status(500).send(err);
    }
    console.log(results)
    res.json({ results });
  });
  // console.log(results); 
  // res.json({ results });
}