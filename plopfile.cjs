module.exports = function (plop) {
  plop.setGenerator('crud', {
    description: '生成 CRUD 页面和 API',
    prompts: [
      {
        type: 'input',
        name: 'moduleName',
        message: '请输入模块名（例如：user）'
      },
      {
        type: 'input',
        name: 'functionName',
        message: '请输入功能名（例如：用户管理）'
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'src/views/{{moduleName}}/index.vue',
        templateFile: 'plop-templates/index.hbs'
      },
      {
        type: 'add',
        path: 'src/views/{{moduleName}}/edit.vue',
        templateFile: 'plop-templates/edit.hbs'
      },
      {
        type: 'add',
        path: 'src/api/{{moduleName}}.ts',
        templateFile: 'plop-templates/api.hbs'
      }
    ]
  })
}
