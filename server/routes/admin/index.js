/* var express = require('express');
var router = express.Router();
const Category = require('../../models/Category');

// 新建分类
router.post('/categories', async  (req,res) => {
  const model =  await Category.create(req.body);
  res.send(model);
});

// 更新分类数据
router.put('/categories/:id', async  (req,res) => {
  const model =  await Category.findByIdAndUpdate(req.params.id, req.body);
  res.send(model);
});

// 删除分类数据
router.delete('/categories/:id', async  (req,res) => {
  await Category.findByIdAndDelete(req.params.id, req.body);
  res.send({
    success: true
  });
});


// 获取分类列表
router.get('/categories', async (req, res) => {
  const items = await Category.find().populate('parent').limit(10);
  res.send(items);
});

// 查询分类
router.get('/categories/:id', async (req, res) => {
  const model = await Category.findById(req.params.id);
  res.send(model);
});




module.exports = router; */
module.exports = app => {
  var express = require('express');
  var router = express.Router({ mergeParams: true });
  const Category = require('../../models/Category');

  // 新建分类
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body);
    res.send(model);
  });

  // 更新分类数据
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body);
    res.send(model);
  });

  // 删除分类数据
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id, req.body);
    res.send({
      success: true
    });


  });


  // 获取分类列表
  router.get('/', async (req, res) => {
    const queryOptions = {};
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    const items = await req.Model.find().setOptions(queryOptions).limit(10)
    res.send(items)
  });

  // 查询分类
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id);
    res.send(model);
  });

  app.use('/admin/api/rest/:resource',  (req, res, next)=>{
    const modelName = require('inflection').classify(req.params.resource);
    req.Model = require(`../../models/${modelName}`)
    next();
  },router)

  const multer = require('multer');
  const upload = multer({dest: __dirname+ '/../../public/uploads'})
  app.post('/admin/api/upload', upload.single('file'), function(req, res) {
    const file = req.file;
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })

}


