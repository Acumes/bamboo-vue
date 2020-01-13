<template>
  <basic-container>
    <avue-crud :option="option"
               :data="data"
               ref="crud"
               v-model="form"
               :permission="permissionList"
               @row-del="rowDel"
               @row-update="rowUpdate"
               @row-save="rowSave"
               :before-open="beforeOpen"
               :page="page"
               @search-change="searchChange"
               @search-reset="searchReset"
               @selection-change="selectionChange"
               @current-change="currentChange"
               @size-change="sizeChange"
               @on-load="onLoad">
      <template slot="menuLeft">
        <el-button type="danger"
                   size="small"
                   icon="el-icon-delete"
                   plain
                   v-if="permission.user_delete"
                   @click="handleDelete">删 除
        </el-button>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
  import {
    getList,
    getUser,
    remove,
    update,
    add
  } from "@/api/system/basic";
  import {getDeptTree} from "@/api/system/dept";
  import {getRoleTree} from "@/api/system/role";
  import {mapGetters} from "vuex";
  import website from '@/config/website';

  export default {
    data() {
      return {
        form: {},
        selectionList: [],
        query: {},
        page: {
          pageSize: 10,
          currentPage: 1,
          total: 0
        },
        init: {
          roleTree: [],
          deptTree: [],
        },
        option: {
          tip: false,
          border: true,
          index: true,
          selection: true,
          viewBtn: true,
          dialogHeight: 450,
          column: [
            {
              label: "编码",
              prop: "code",
              search: true,
              rules: [{
                required: true,
                message: "请输入编码",
                trigger: "blur"
              }],
              span: website.tenantMode ? 12 : 24,
            },
            {
              label: "名称",
              prop: "name",
              search: true,
              rules: [{
                required: true,
                message: "请输入名称",
                trigger: "blur"
              }]
            },
            {
              label: "当前价格",
              prop: "currentPrice",
              rules: [{
                required: true,
                message: "请输入当前价格",
                trigger: "blur"
              }]
            },
            {
              label: "目标价格",
              prop: "targetPrice",
              rules: [{
                required: true,
                message: "请输入当前价格",
                trigger: "blur"
              }]
            },
            {
              label: "所属概念",
              prop: "concept"
            },

          ]
        },
        data: []
      };
    },
    watch: {
      'form.tenantId'() {
        if (this.form.tenantId !== '') {
          getDeptTree(this.form.tenantId).then(res => {
            const index = this.$refs.crud.findColumnIndex("deptId");
            this.option.column[index].dicData = res.data.data;
          });
          getRoleTree(this.form.tenantId).then(res => {
            const index = this.$refs.crud.findColumnIndex("roleId");
            this.option.column[index].dicData = res.data.data;
          });
        }
      }
    },
    computed: {
      ...mapGetters(["permission"]),
      permissionList() {
        return {
          addBtn: this.vaildData(this.permission.user_add, false),
          viewBtn: this.vaildData(this.permission.user_view, false),
          delBtn: this.vaildData(this.permission.user_delete, false),
          editBtn: this.vaildData(this.permission.user_edit, false)
        };
      },
      ids() {
        let ids = [];
        this.selectionList.forEach(ele => {
          ids.push(ele.id);
        });
        return ids.join(",");
      },
    },
    methods: {
      rowSave(row, loading, done) {
        add(row).then(() => {
          loading();
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!"
          });
        }, error => {
          done();
          console.log(error);
        });
      },
      rowUpdate(row, index, loading, done) {
        row.deptId = row.deptId.join(",");
        row.roleId = row.roleId.join(",");
        update(row).then(() => {
          loading();
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!"
          });
        }, error => {
          done();
          console.log(error);
        });
      },
      rowDel(row) {
        this.$confirm("确定将选择数据删除?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            return remove(row.id);
          })
          .then(() => {
            this.onLoad(this.page);
            this.$message({
              type: "success",
              message: "操作成功!"
            });
          });
      },
      searchReset() {
        this.query = {};
        this.onLoad(this.page);
      },
      searchChange(params) {
        this.query = params;
        this.onLoad(this.page, params);
      },
      selectionChange(list) {
        this.selectionList = list;
      },
      handleDelete() {
        if (this.selectionList.length === 0) {
          this.$message.warning("请选择至少一条数据");
          return;
        }
        this.$confirm("确定将选择数据删除?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            return remove(this.ids);
          })
          .then(() => {
            this.onLoad(this.page);
            this.$message({
              type: "success",
              message: "操作成功!"
            });
            this.$refs.crud.toggleSelection();
          });
      },
      beforeOpen(done, type) {
        if (["edit", "view"].includes(type)) {
          getUser(this.form.id).then(res => {
            this.form = res.data.data;
            this.form.deptId = this.form.deptId.split(",");
            this.form.deptId.forEach((ele, index) => {
              this.form.deptId[index] = Number(ele);
            });
            this.form.roleId = this.form.roleId.split(",");
            this.form.roleId.forEach((ele, index) => {
              this.form.roleId[index] = Number(ele);
            });
          });
        }
        done();
      },
      currentChange(currentPage){
        this.page.currentPage = currentPage;
      },
      sizeChange(pageSize){
        this.page.pageSize = pageSize;
      },
      onLoad(page, params = {}) {
        this.query = {
          code : params.code,
          pageNo:page.currentPage,
          pageSize: page.pageSize,
          name : params.name
        }
        getList( this.query).then(res => {
          const data = res.data.data;
          this.page.total = data.total;
          this.data = data.list;
        });
      }
    }
  };
</script>

<style>
</style>
