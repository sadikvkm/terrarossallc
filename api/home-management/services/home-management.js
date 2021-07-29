'use strict';
var knexConn = require('../../../config/knex');
const knex = knexConn.knexDb();
const { getUploadFile } = require('../../../helpers');

module.exports = {

  getHome: async() => {

    let pass = {};
    let result = await knex.from("home_managements")
    .where('published_at', 'IS NOT', null)
    .orderBy('created_at', 'DESC')
    .select('id')
    .first();

    if (!result) return;

    if(result) {
      let homeId = result.id;
      let sliders = [];
      result = await knex.from("home_managements_components")
        .where('home_management_id', homeId)
        .where('component_type', 'components_sliders_sliders')
        .join('components_sliders_sliders as SL', 'home_managements_components.component_id', '=', 'SL.id')
        .select('SL.id', 'title', 'sub_title')
      for (let i = 0; i < result.length; i++) {
        const data = result[i];
        sliders.push({
          ...data,
          image: await getUploadFile(data.id, 'components_sliders_sliders')
        })
      }
      pass['sliders'] = sliders;

      //Section block
      result = await knex.from("home_managements_components")
        .where('home_management_id', homeId)
        .where('component_type', 'components_card_section_block_card_section_blocks')
        .join('components_card_section_block_card_section_blocks as SL', 'home_managements_components.component_id', '=', 'SL.id')
        .select('SL.id', 'label', 'icon', 'text_color', 'icon_color')

      pass['section_block_card'] = result;

      //About Section
      result = await knex.from("home_managements_components")
        .where('home_management_id', homeId)
        .where('component_type', 'components_home_about_section_home_about_sections')
        .join('components_home_about_section_home_about_sections as SL', 'home_managements_components.component_id', '=', 'SL.id')
        .select('SL.id', 'title', 'sub_title', 'description', 'action_url')
        .where('SL.status', 1)
        .first();
      if (result) {
        result['main_image'] = await getUploadFile(result.id, 'components_home_about_section_home_about_sections', 'main_image')
        result['sub_image'] = await getUploadFile(result.id, 'components_home_about_section_home_about_sections', 'sub_image')
      }
      pass['about_section'] = result;

      //Our Services
      result = await knex.from("home_managements_components")
        .where('home_management_id', homeId)
        .where('component_type', 'components_service_section_service_sections')
        .join('components_service_section_service_sections as CS', 'home_managements_components.component_id', '=', 'CS.id')
        .select('component_id', 'title', 'sub_title')
        .first();

      if (result) {
        let srv = await knex.from("components_service_section_service_sections__our_services as CMD")
          .where('CMD.components_service_section_service_section_id', result.component_id)
          .join('our_services', 'CMD.our-service_id', '=', 'our_services.id')
          .select('our_services.id', 'our_services.title', 'our_services.short_description', 'our_services.icon', 'our_services.slug')
          .where('our_services.published_at', 'IS NOT', null)

        let services = [];
        for (let i = 0; i < srv.length; i++) {
          const el = srv[i];
          services.push({
            ...el,
            image: await getUploadFile(el.id, 'our_services')
          })

        }
        result = {
          title: result.title,
          sub_title: result.sub_title,
          services: services
        }
      }else {
        result
      }

      pass['our_services'] = result;

      //Gallery
      result = await knex.from("home_managements_components")
        .where('home_management_id', homeId)
        .where('component_type', 'components_service_section_service_sections')
        .join('components_gallery_section_gallery_sections as GL', 'home_managements_components.component_id', '=', 'GL.id')
        .select('component_id', 'title')
        .first();

      if (result) {
        let s = await knex.from("components_gallery_section_gallery_sections__galleries as CGL")
          .where('CGL.components_gallery_section_gallery_section_id', result.component_id)
          .join('galleries', 'CGL.gallery_id', '=', 'galleries.id')
          .select('galleries.id', 'galleries.title', 'sub_title')
          .where('galleries.published_at', 'IS NOT', null)

        let gl = [];
        for (let i = 0; i < s.length; i++) {
          const el = s[i];
          gl.push({
            ...el,
            image: await getUploadFile(el.id, 'galleries')
          })

        }
        result = {
          title: result.title,
          galleries: gl
        }
      }

      pass['gallery_section'] = result;

      //Project Section
      result = await knex.from("home_managements_components")
        .where('home_management_id', homeId)
        .where('component_type', 'components_project_section_project_sections')
        .join('components_project_section_project_sections as PR', 'home_managements_components.component_id', '=', 'PR.id')
        .select('component_id', 'title', 'sub_title')
        .first();

      if (result) {
        let q = await knex.from("components_project_section_project_sections__projects as CPR")
          .where('CPR.components_project_section_project_section_id', result.component_id)
          .join('projects', 'CPR.project_id', '=', 'projects.id')
          .select('projects.id', 'projects.title', 'slug', 'short_description')
          .where('projects.published_at', 'IS NOT', null)

        let gl = [];
        for (let i = 0; i < q.length; i++) {
          const el = q[i];
          gl.push({
            ...el,
            image: await getUploadFile(el.id, 'projects')
          })

        }

        result = {
          title: result.title,
          sub_title: result.sub_title,
          projects: gl
        }
      }

      pass['project_section'] = result;

      //Action Plans
       result = await knex.from("home_managements_components")
        .where('home_management_id', homeId)
         .where('component_type', 'components_actions_actions')
         .join('components_actions_actions as PR', 'home_managements_components.component_id', '=', 'PR.id')
         .select('component_id', 'PR.id', 'title', 'sub_title', 'video_url')
        .first();

      if (result) {
        let qs = await knex.from("components_actions_actions__action_plans as AC")
          .where('AC.components_actions_action_id', result.component_id)
          .join('action_plans', 'AC.action-plan_id', '=', 'action_plans.id')
          .select('action_plans.id', 'action_plans.title', 'short_description')
          .where('action_plans.published_at', 'IS NOT', null)

        result = {
          title: result.title,
          sub_title: result.sub_title,
          image: await getUploadFile(result.id, 'components_actions_actions', 'image'),
          secondary_image: await getUploadFile(result.id, 'components_actions_actions', 'secondary_image'),
          video_url: result.video_url,
          action_plans: qs
        }
      }
      pass['action_plan'] = result;

    }

    return pass;
  }
};
