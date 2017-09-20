import models from '../models';

const Recipedata = models.Recipedata;

module.exports = {
 addRecipe(req, res) { 
    req.checkBody('title', 'title is required').notEmpty();
    req.checkBody('title', 'title must be at least 8 characters long').matches(/^[a-zA-Z]{8,}$/);
    req.checkBody('description', 'description is required').notEmpty();
    req.checkBody('description', 'description must be at least 8 characters long').matches(/^[a-zA-Z]{8,}$/);
    req.checkBody('ingredients', 'ingredients is required').notEmpty();
    req.checkBody('procedures', 'procedures is required').notEmpty();
    
    const errors = req.validationErrors();
    if (errors) {
      const errorObject = errors.map(error => error.msg);
      return res.status(400).send({
        message: errorObject,
      });
    }
    return Recipedata
      .create({
        title: req.body.title,
        description: req.body.description,
        ingredients: req.body.ingredients,
        procedures: req.body.procedures,
        addedBy: req.decoded.userId,
      })
      .then((recipedata) => res.status(201).send({message: 'Added successfully'}))
      .catch((error) => res.status(400).send(error));;
  },
  listRecipe(req, res) {

    return Recipedata
      .findAll()
      .then((recipedata) => {
        if (recipedata.length <= 0) {
          return res.status(404).send({message:'No Recipe was found!'});
        } 
        return res.status(200).send(recipedata)
      })
      .catch((error) => res.status(400).send({message:'Error. Please try again'}));
  },
  retrieveRecipe(req, res) {
    req.checkParams('id', 'Please input a valid id.').isInt();
    
      const errors = req.validationErrors();
      if (errors) {
        const errorObject = errors.map(error => error.msg);
        return res.status(400).send({
          message: errorObject,
        });
      }

    return Recipedata
      .findOne({
        where:{
          id: req.params.id,
        }
      })
      .then((recipedata) => {
        if (recipedata) {
          return res.status(200).send(recipedata);
        }
        return res.status(400).send({message: 'Recipe Not Found'});
      })
      .catch((error) => res.status(400).send({message:'Error. Please try again'}));
  },
  updateRecipe(req, res) {

    req.checkParams('id', 'Please input a valid id.').isInt();
    
      const errors = req.validationErrors();
      if (errors) {
        const errorObject = errors.map(error => error.msg);
        return res.status(400).send({
          message: errorObject,
        });
      }

    return Recipedata
      .find({
        where:{
          addedBy: req.decoded.userId,
          id: req.params.id,
        }
      })
      .then((recipedata) => {
          if (!recipedata) {
            return res.status(404).send({message: 'You can only update you recipe'});
          }
          Recipedata
            .update({
              title: req.body.title || recipedata.title,
              description: req.body.description || recipedata.description,
              ingredients: req.body.ingredients || recipedata.ingredients,
              procedures: req.body.procedures || recipedata.procedures,
          })
          .then((recipedata) => res.status(200).send(recipedata))
          .catch((error) => res.status(400).send(error));
     })
      .catch((error) => res.status(500).send({message:'Error. Please try again'}));
  },
  
  deleteRecipe(req, res) {
    req.checkParams('id', 'Please input a valid id.').isInt();
    
      const errors = req.validationErrors();
      if (errors) {
        const errorObject = errors.map(error => error.msg);
        return res.status(400).send({
          message: errorObject,
        });
      }

    Recipedata
      .find({
        where:{
          addedBy: req.decoded.userId,
          id: req.params.id,
        }
      })
      .then((recipedata) => {
        if (!recipedata) {
          return res.status(404).send({message: 'You can only delete you recipe'});
        }
        recipedata
          .destroy()
          .then((recipedata) => res.status(200).send({message:'Delete Successfully'}))
          .catch((error) => res.status(400).send({message:'Error. Please try again'}));
      })
      .catch((error) => res.status(500).send({message:'Error. Please try again'}));
  },
  getMostUpVote(req, res) {
    return Recipedata
      .findAll({
        order: [['upvotes', 'DESC']],
      })
      .then((recipedata) => res.status(200).send(recipedata))
      .catch(error => res.status(200).send(error));

  }
};
