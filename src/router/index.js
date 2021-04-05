import Vue from "vue";
import VueRouter from "vue-router";

import FlapMain from '@/views/FlapMain';
import RegList from '@/views/RegList';
import Menu from '@/views/Menu';

Vue.use(VueRouter);

let routes = [
	{
		name: 'flap-main',
		path: '/',
		component: FlapMain
	},
	{
		name: 'reg-list',
		path: '/reg-list',
		component: RegList
	},
	{
		name: 'menu',
		path: '/menu',
		component: Menu
	},
];

export default new VueRouter({
	mode: 'history',
	routes
})