<template>
  <div class="main__section__card">
    <div class="main__section__card__date">
      <span class="main__section__card__month">{{
        new Date(meeting.dateInt).toString().split(" ")[1]
      }}</span>
      <span class="main__section__card__day">{{
        new Date(meeting.dateInt).toString().split(" ")[2]
      }}</span>
    </div>
    <router-link
      :to="{ name: 'Meeting', params: { meeting: meeting.id } }"
      class="main__section__card__body done"
      v-if="meeting.dateEnd < Date.now()"
    >
      <span class="main__section__link__text__content">
        <span class="text-title">{{ meeting.name }}</span>
        <span class="text-content"
          >{{
            new Date(meeting.dateInt - 1000 * 60 * 60 * 5)
              .toISOString()
              .substr(11, 5)
          }}
          -
          {{
            new Date(meeting.dateEnd - 1000 * 60 * 60 * 5)
              .toISOString()
              .substr(11, 5)
          }}</span
        >
      </span>
    </router-link>
    <router-link
      :to="{ name: 'Meeting', params: { meeting: meeting.id } }"
      class="main__section__card__body active"
      v-else-if="meeting.dateInt >= Date.now() && meeting.dateEnd <= Date.now()"
    >
      <span class="main__section__link__text__content">
        <span class="text-title">{{ meeting.name }}</span>
        <span class="text-content"
          >{{
            new Date(meeting.dateInt - 1000 * 60 * 60 * 5)
              .toISOString()
              .substr(11, 5)
          }}
          -
          {{
            new Date(meeting.dateEnd - 1000 * 60 * 60 * 5)
              .toISOString()
              .substr(11, 5)
          }}</span
        >
      </span>
    </router-link>
    <router-link
      :to="{ name: 'Meeting', params: { meeting: meeting.id } }"
      class="main__section__card__body"
      v-else
    >
      <span class="main__section__link__text__content">
        <span class="text-title">{{ meeting.name }}</span>
        <span class="text-content"
          >{{
            new Date(meeting.dateInt - 1000 * 60 * 60 * 5)
              .toISOString()
              .substr(11, 5)
          }}
          -
          {{
            new Date(meeting.dateEnd - 1000 * 60 * 60 * 5)
              .toISOString()
              .substr(11, 5)
          }}</span
        >
      </span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Meeting',
  props: ['meeting']
}
</script>