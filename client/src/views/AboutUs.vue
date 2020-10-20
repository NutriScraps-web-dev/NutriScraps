<template>
  <b-container center fluid="sm">
    <b-row class="aboutUsImgMargin d-flex">
      <b-col class="aboutUsImgRes">
        <b-img
          fluid
          class="aboutUsImg"
          src="https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1306&q=80"
          alt="Food image"
        ></b-img>
      </b-col>
      <b-col class="aboutUsText">
        <b-container class= "aboutUsTextMargin">
          <h1 right class= "mt-3 mr-1">Our Story</h1>
          <h5 right class= "mt-4 mr-1 aboutUsText" >
            Sep 2020, the founders of NutriScraps Chen, Idress and Bhavya met as IT students.
            With the passion of excellent food everyday, a group of students who study in University of Gothenburg started the project, named NutriScraps.
            <br/>
            <br/>
            They believe that everyone should be encouraged to share and get the idea of their food and cooking experience.
            From there, we brought the modren idea of cooking and a brand new online platform where everyone can spark their idea about cooking in.
            </h5>
        </b-container>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {}
</script>

<style>
.aboutUsImgMargin {
  margin-top: 20%;
  margin-bottom: 20%;
  flex-wrap:wrap;
}
.aboutUsImgRes {
  min-width: 750px;
}
.aboutUsImg {
  width: 70%;
  height: auto;
}
.aboutUsText {
  line-height:1.7
}
.aboutUsTextRes {
  min-width: 750px;
}
.aboutTextMargin {
  margin-top: 10%;
}
</style>
