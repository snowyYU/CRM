import {environment} from '../../environments/environment';


/**
 * 环境
 */
interface Environment{
  production?: boolean,
  test?:boolean,
  development?:boolean
}

/**
 * 主机地址
 */
class Host{
  dev:string;
  test:string;
  prod:string;

  /**
   * 构造函数
   * @param dev 开发环境地址
   * @param test 测试环境地址
   * @param prod 生产环境地址
   */
  constructor(dev:string,test:string,prod:string){
    this.dev=dev;
    this.test=test;
    this.prod=prod;
  }

  /**
   * 获取当前环境主机地址
   * @param env
   * @returns {string}
   */
  getCurrentHost(env:Environment){
    if(env.production){
      return this.prod;
    }else if(env.test){
      return this.test;
    }else{
      return this.dev;
    }
  }
}

/**
 * 基本配置
 * @type {{name: string; version: string; env: {production: boolean; test: boolean; development: boolean}}}
 */
export const config :{
  name: string,
  version: string,
  env: Environment
}= {
  name: 'crm_web',
  version: '0.0.1',
  env: {
    production:environment.production,
    test:environment.test,
    development:environment.development
  }
};

{
  //根据外部环境(assets/config/environment.js)设置覆盖当前环境设置
  let env:string='';
  if(typeof window['env']==='string'){
    env=window['env'].toLowerCase();
    if(env==='prod'||env==='production'){
      config.env.production=true;
      config.env.test=false;
      config.env.development=false;
    }else if(env==='test'){
      config.env.production=false;
      config.env.test=true;
      config.env.development=false;
    }else if(env==='dev'||env==='development'){
      config.env.production=false;
      config.env.test=false;
      config.env.development=true;
    }
  }
}

//项目主接口地址
export  const host=new Host(
  'http://192.168.10.10:8090/crm/',//dev
  'http://192.168.10.10:9090/crm/',//test
  'http://192.168.10.10:9090/crm/'//prod
).getCurrentHost(config.env);

//认证相关接口地址
export const host_ims=new Host(
  'http://192.168.10.10:8090/ims/',//dev
  'http://192.168.10.10:9090/ims/',//test
  'http://192.168.10.10:9090/ims/'//prod
).getCurrentHost(config.env);

//文件相关接口地址
export const host_file=new Host(
  'http://121.46.18.25:9090',//dev
  'http://121.46.18.25:9090',//test
  'http://121.46.18.25:9090'//prod
).getCurrentHost(config.env);


export const API = {
  login: {
    url: 'oauth/login',
    method: 'post'
  },
  setPassword:{//修改密码/审核口令
    url:'/iam/employee/setPwd',
    method: 'post'
  },
  /*-----------------------------------刷新Token---------------------------------------*/
  refreshToken:{
    url:'oauth/refreshToken',
    method:'post'
  },
  /*-----------------------------------地址类接口---------------------------------------*/
  areaAddress:{
    url:'sys/area/getByPage',
    method:'get'
  },


  /*-----------------------------------字典列表接口---------------------------------------*/

  getDictList:{
    url:'sys/dict/getDictList',
    method:'get'
  },


  /*-----------------------------------业务员拓展---------------------------------------*/
  /*-----------------------------------客户名册---------------------------------------*/
  customerList:{//客户名册列表
    url:'sem/guest/getByPage',
    method:'post'
  },
  customerDetail:{//客户详情
    url:'sem/guest/getById',
    method:'get'
  },
  customerSaveOrUpdate:{//客户编辑
    url:'sem/guest/saveOrUpdateGuest',
    method:'post'
  },

  customerDelete:{//删除客户名册数据
    url:'sem/guest/delete',
    method:'delete'
  },
  saveOrUpdateGuest:{//保存或修改客户名册数据
    url:'sem/guest/saveOrUpdateGuest',
    method:'post'
  },
  getBigClassifyList:{//获取大类列表
    url:'classify/enum/getBigClassifyList',
    method:'get'
  },
  getClassifyList:{//获取小类列表
    url:'classify/enum/getClassifyList',
    method:'get'
  },
  getServiceManList:{//获取客服经理列表
    url:'sem/guest/getServiceManList',
    method:'get'
  },
  updateServiceMan:{//客户名册变更客户客服经理
    url:'sem/guest/updateServiceMan',
    method:'post'
  },


  /*-----------------------------------业务员拓展---------------------------------------*/
  /*-----------------------------------会员认证部分的接口---------------------------------------*/
  authMemberList:{//获取申请认证列表（分页）
    url:'sem/memberAuth/getByPage',
    method:'get'
  },
  authMemberApply:{//会员“申请认证”接口
    url:'sem/memberAuth/memberAuthApply',
    method:'post'
  },
  authMemberDetail:{//根据认证ID获取认证详情
    url:'sem/memberAuth/getById',
    method:'get'
  },
  authMemberCount:{//统计最新会员认证申请回复记录数
    url:'sem/memberAuth/countAuthApplyReply',
    method:'get'
  },

  /*-----------------------------------业务员拓展---------------------------------------*/
  /*-----------------------------------拜访报告---------------------------------------*/

  visitReportList:{//拜访报告表
    url:'sem/visitTimetable/getByPage',
    method:'post'
  },
  visitReportDetail:{//查看详情
    url: 'sem/visitTimetable/getById',
    method: 'get'
  },

  getAllApp:{
    url:'ms/commondb/prmResourceRegister/getAllApp',
    method:'get'
  },

  visitReportAdd:{//新增拜访报告
    url:'sem/visitTimetable/create',
    method:'post'
  },
  visitReportEdit:{//拜访报告修改
    url:'sem/visitTimetable/update',
    method:'post'
  },
  visitReportSaveCustomer:{//保存客户信息
    url:'sem/visitTimetable/saveGuest',
    method:'post'
  },

  visitReportGetGusetMemberList:{
    url:'sem/visitTimetable/getGusetMemberList',
    method:'get'
  },


  /*-----------------------------------会员管理---------------------------------------*/
  /*-----------------------------------会员管理---------------------------------------*/
  vipManageList:{//会员管理列表
    url:'member/getByPage',
    method:'post'
  },
  getCreditFacilityList:{//查看授信额度
    url:'member/getCreditFacilityList',
    method:'get'
  },
  checkApplyExist:{//会员对应产品进行重新授信时，校验对应产品是否已经申请授信且正在审批
    url:'sem/creditAuth/checkApplyExist',
    method:'post'
  },
  getProductsList:{//根据appId获取产品列表
    url:'sem/creditAuth/getProductsList',
    method:'post'
  },
  getProductsParam:{
    url:'sem/creditAuth/getProductsParam',
    method:'post'
  },
  creditAuthApply:{//保存产品授信|重新授信接口
    url:'sem/creditAuth/creditAuthApply',
    method:'post'
  },
  memberDetailMain:{//查询单个会员的概要详情
    url:'member/getMemberOutline',
    method:'get'
  },
  changeServiceMan:{//用户主管级别用户，会员管理模块变更客服经理
    url:'member/changeServiceMan',
    method:'post'
  },


  memberCompanyInfo:{//会员详情>尽调资料>企业基本信息
    url:'member/getMemberBaseInfo',
    method:'get'
  },
  //企业基本信息四个保存编辑接口
  saveCompanyBorrower:{//修改借款人信息
    url:'ms/commondb/companyBorrower/update',
    method:'post'
  },
  saveCompanyInfo:{//修改公司信息
    url:'ms/commondb/company/update',
    method:'post'
  },
  saveCompanyLegal:{//修改法人信息
    url:'ms/commondb/companyLegal/update',
    method:'post'
  },
  saveCompanyBankCard:{//修改银行信息
    url:'ms/commondb/companyBankCard/update',
    method:'post'
  },
  getBanks:{//获取银行列表
    url:'base/baseBankController/getBanks',
    method:'post'
  },
  getSubbankList:{// 获取指定银行支行列表
    url:'base/baseBankController/getSubbankList',
    method:'post'
  },
  updateApply:{//修改银行信息
    url:'ms/commondb/companyBankCard/updateApply',
    method:'post'
  },
  upBankCardApply:{//公司银行卡编辑
    url:'ms/commondb/companyBankCard/upBankCardApply',
    method:'post'
  },



  getOperationSituation:{//会员详情>尽调资料>运营状况
    url:'member/getOperationSituation',
    method:'get'
  },

  saveRunInfo:{//修改运营信息
    url:'ms/commondb/companyOperation/update',
    method:'post'
  },

  getRiskFill:{//会员风控补充资料
    url:'member/getRiskFill',
    method:'get'
  },

  saveCompanyAsset:{//修改资产信息
    url:'ms/commondb/companyAsset/update',
    method:'post'
  },
  saveCompanyDebt:{//修改负债信息
    url:'ms/commondb/companyDebt/update',
    method:'post'
  },
  saveCompanyCredit:{//修改履约信息
    url:'ms/commondb/companyCredit/update',
    method:'post'
  },
  getCompanyAttach:{//会员查看电子附件接口
    url:'member/getCompanyAttach',
    method:'get'
  },
  getMemberReports:{//会员尽调报告查询接口
    url:'member/getMemberReports',
    method:'get'
  },

  /*-----------------------------------会员管理---------------------------------------*/
  /*-----------------------------------资料变更---------------------------------------*/

  infoChangeList:{//资料变更列表
    url:'ms/userUpdateApply/getByPage',
    method:'post'
  },

  infoChangeDetail:{//资料变更申请单条记录详情
    url:'ms/userUpdateApply/getById',
    method:'get'
  },

  infoChangeCheckSubmit:{//资料变更申请单条记录审核操作
    url:'ms/userUpdateApply/check',
    method:'post'
  },
  /*-----------------------------------会员管理---------------------------------------*/
  /*-----------------------------------授信申请---------------------------------------*/

  getApplyList:{//查看授信申请列表
    url:'sem/creditAuth/getByPage',
    method:'post'
  },
  getApplyDetail:{//查看授信申请单条详情
    url:'sem/creditAuth/getDetails',
    method:'post'
  },
  /*-----------------------------------会员管理---------------------------------------*/
  /*-----------------------------------关联企业---------------------------------------*/
  getRcCompanyList:{//获取关联企业列表
    url:'rcCompany/getByPage',
    method:'post'
  },
  getMembers:{//获取企业关联会员
    url:'rcCompany/getMembers',
    method:'post'
  },



  /*-----------------------------------账户管理---------------------------------------*/
  /*-----------------------------------会员账户余额---------------------------------------*/
  getMemberAccountInfo:{//会员账户余额（分页）
    url:'account/accountManage/getMemberAccountInfo',
    method:'get'
  },
  countMemberAccount:{//统计会员数 配置电子账户率接口
    url:'member/countMemberAccount',
    method:'get'
  },
  getNotAccountMember:{//获取未开户会员列表
    url:'account/accountManage/getNotAccountMember',
    method:'get'
  },
  getMemberAcctFlows:{//会员账户流水（分页）
    url:'account/accountManage/getMemberAcctFlows',
    method:'get'
  },

  getByMemberName:{
    url:'member/getByMemberName',
    method:'post'
  },

  getSingleMemberAccountInfo:{//开户页面会员信息显示
    url:'account/accountManage/getSingleMemberAccountInfo',
    method:'get'
  },
  openMemberAccount:{//开户接口
    url:'account/accountManage/openMemberAccount',
    method:'post'
  },
  accountCancellation:{//销户
    url:'account/accountManage/accountCancellation',
    method:'post'
  },
  getMemberByKeyword:{//电子签章获取会员相关数据
    url:'signature/user/getMemberByKeyword',
    method:'get'
  },
  createUser:{//开通签章
    url:'signature/user/createUser',
    method:'post'
  },
  deleteUserSeal:{//注销签章
    url:'signature/user/deleteUserSeal',
    method:'post'
  },

  /*-----------------------------------文件服务器的接口---------------------------------------*/
  fileServer:host_file,


  /*-----------------------------------登录接口，刷新token接口---------------------------------------*/
  loginHost:host_ims,

  getByDepart:{//根据部门获取下属员工
    url:'iam/employee/getByDepart',
    method:'get'
  }

};

