<template>
  <div class="toolbar">
    <div class="settings">
      <div class="option">
        <p>Setting</p>
      </div>
      <div class="scroll-y">
        <div class="accordion" role="tablist">
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <p block v-b-toggle.accordion-1 variant="info">Tài khoản</p>
            </b-card-header>
            <b-collapse
              id="accordion-1"
              visible
              accordion="my-accordion"
              role="tabpanel"
            >
              <b-card-body>
                <b-card-text
                  >I start opened because <code>visible</code> is
                  <code>true</code></b-card-text
                >
                <b-card-text>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Doloremque exercitationem non ipsum, quidem dolores ab velit
                  alias mollitia officiis quisquam. Eum quasi quibusdam quas at
                  odit? Error culpa accusamus magnam. Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Expedita repellat ratione sequi
                  in, voluptates consectetur! Aspernatur veritatis commodi
                  consequuntur! Sint dolore laudantium aspernatur accusantium
                  nihil, voluptate eos fugiat obcaecati, consequatur porro neque
                  sequi. Eligendi, provident a, minima earum illum magni
                  sapiente aliquid repudiandae dolorum excepturi ratione
                  similique omnis. Minima corporis fugiat ad exercitationem
                  consequuntur molestias mollitia voluptatibus laboriosam magni
                  consequatur iusto laudantium repellat maxime obcaecati
                  repudiandae dolorem blanditiis, fuga numquam ducimus fugit
                  corrupti! Iste, quia, placeat libero saepe quisquam enim
                  temporibus qui illum laborum ut consequuntur facilis
                  distinctio expedita explicabo voluptates nemo, voluptatum sint
                  obcaecati sed! Expedita veritatis accusantium
                  numquam.</b-card-text
                >
              </b-card-body>
            </b-collapse>
          </b-card>

          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <p block v-b-toggle.accordion-2 variant="info">Ngôn ngữ</p>
            </b-card-header>
            <b-collapse
              id="accordion-2"
              accordion="my-accordion"
              role="tabpanel"
            >
              <b-card-body>
                <b-card-text>{{ text }}</b-card-text>
              </b-card-body>
            </b-collapse>
          </b-card>

          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <p block v-b-toggle.accordion-3 variant="info">Thông báo</p>
            </b-card-header>
            <b-collapse
              id="accordion-3"
              accordion="my-accordion"
              role="tabpanel"
            >
              <b-card-body>
                <b-card-text>{{ text }}</b-card-text>
              </b-card-body>
            </b-collapse>
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SettingPage',
  data() {
    return {
      text: 'lorem',
    }
  },
}
</script>

<style></style>
