// npm i @koa/router   npm i koa-body
const Router = require('@koa/router');
const router = new Router({prefix:'/admin'});
router.get('/',ctx=>{
    ctx.body = '后端接口';
})

/*
category 表: id 编号 ，name 分类名称  parentId 父级id
goods 表: id编号，title  名称， categoryId分类编号, content 内容,price打折价格 market_parice 市场，stock库存
大作业： koa2框架 + mysql + async...await  : 
orm对象映射： db类库封装(mysql + sequelize--findall,create,update,destory方法返回Promise对象,设计表结构)
官网 https://www.sequelize.cn/

npm i mysql2
npm i sequelize
*/
let model = require('../model/index');
let Category = model.category;
let Goods = model.goods;

// category 商品分类接口:
// 1. GET分类列表: http://localhost:3000/admin/getCateList
router.get("/getCateList",async ctx=>{
    let lists =await Category.findAll();  // db.query(sql)
    ctx.body = {code:800,msg:'商品分类查询成功',data:lists};
});
// 2. POST分类的增删改http://localhost:3000/admin/cateSubmit
/*
添加传值 action:add    name: 童装...
修改传值 action:edit   id:1  name: 童装
删除传值 action:delete id:1
*/
router.post("/cateSubmit",async ctx=>{
  const { id, action, ...param } = ctx.request.body;
  console.log(id, action, param); // undefined add { name: '童装' }
  try {
    if (action == "add") {
      // 添加 create()
      await Category.create(param);
      ctx.body = { code: 800, mag: "商品分类添加成功", data: [] };
    } else if (action == "edit") {
      //修改update
      await Category.update(param,{where:{id:id}});
      ctx.body = { code: 800, mag: "商品分类修改成功", data: [] };
    } else if (action == "delete") {
      //删除destroy
      await Category.destroy({where:{id}});
      ctx.body = { code: 800, mag: "商品分类删除成功", data: [] };
    }
  } catch (err) {
    ctx.body = err;
  }
})

/*
分页原理： select ....  order by id desc limit offset,pageSize
offset 每页的起始索引 = (page -1)*pageSize ;  page 当前页,  pageSize 每页显示条数

*/
// goods 商品分类接口:
// 1. GET分类列表: http://localhost:3000/admin/getGoodsList?page=1
router.get("/getGoodsList",async ctx=>{
    const {page=1,pageSize=2} = ctx.query;
    //let lists =await Goods.findAll();  // db.query(sql)
    let totalRes = await Goods.findAll();
    let total = totalRes.length;
    let lists = await Goods.findAll({
      offset: (parseInt(page) - 1) * parseInt(pageSize),
      limit: parseInt(pageSize),
      order: [["id", "desc"]],
      //include:Category
      include: [{ model: Category, attributes: ["name"] }],
    });
    ctx.body = { code: 800, msg: "商品查询成功", data: { lists ,page,total} }; // 将来通过total计算总页数
});
/*
{
    "code": 800,
    "msg": "商品查询成功",
    "data": {
        "lists": [
            {
                "id": 1,
                "title": "11",
                "imgurl": "1",
                "content": "11",
                "price": "200.00",
                "market_price": "256.00",
                "stock": 100,
                "createdAt": "2023-05-10T11:24:28.000Z",
                "updatedAt": "2023-05-10T11:24:32.000Z",
                "categoryId": 1,
                "category": {  
                    "name": "男装"
                }
            }
        ],
        "page": "1",
        "total": 1
    }
}
*/
// 2. POST分类的增删改http://localhost:3000/admin/goodsSubmit
/*
添加传值 action:add    title:'裙子' content:'内容' price:200 market_price 300 stock 1000 categoryId:2
修改传值 action:edit   id:1  ....
删除传值 action:delete id:1
*/
router.post("/goodsSubmit",async ctx=>{
  const { id, action, ...param } = ctx.request.body;
  console.log(id, action, param); // undefined add { name: '童装' }
  try {
    if (action == "add") {
      // 添加 create()
      await Goods.create(param);
      ctx.body = { code: 800, mag: "商品添加成功", data: [] };
    } else if (action == "edit") {
      //修改update
      await Goods.update(param,{where:{id:id}});
      ctx.body = { code: 800, mag: "商品修改成功", data: [] };
    } else if (action == "delete") {
      //删除destroy
      await Goods.destroy({where:{id}});
      ctx.body = { code: 800, mag: "商品删除成功", data: [] };
      ctx.body = { code: 800, msg: "商品添加成功", data: [] };
    } else if (action == "edit") {
      //修改update
      await Goods.update(param,{where:{id:id}});
      ctx.body = { code: 800, msg: "商品修改成功", data: [] };
    } else if (action == "delete") {
      //删除destroy
      await Goods.destroy({where:{id}});
      ctx.body = { code: 800, msg: "商品删除成功", data: [] };
    }
  } catch (err) {
    ctx.body = err;
  }
})



module.exports = router;















