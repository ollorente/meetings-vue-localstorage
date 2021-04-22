<template>
  <div class="main__section__card">
    <div class="main__section__card__date">
      <span class="main__section__card__month">{{
        new Date(meeting.dateInt).toDateString().substr(4, 3)
      }}</span>
      <span class="main__section__card__day">{{
        new Date(meeting.dateInt).toDateString().substr(8, 2)
      }}</span>
    </div>
    <router-link
      :to="{ name: 'Meeting', params: { meeting: meeting._id } }"
      class="main__section__card__body done"
      v-if="meeting.dateEnd < Date.now()"
    >
      <span class="main__section__link__text__content">
        <span class="text-title">{{ meeting.name }}</span>
        <span class="text-content"
          >{{ meeting.dateInt.substr(11, 5) }} -
          {{ meeting.dateEnd.substr(11, 5) }}</span
        >
      </span>
    </router-link>
    <router-link
      :to="{ name: 'Meeting', params: { meeting: meeting._id } }"
      class="main__section__card__body active"
      v-else-if="meeting.dateInt >= Date.now() && meeting.dateEnd <= Date.now()"
    >
      <span class="main__section__link__text__content">
        <span class="text-title">{{ meeting.name }}</span>
        <span class="text-content"
          >{{ meeting.dateInt.substr(11, 5) }} -
          {{ meeting.dateEnd.substr(11, 5) }}</span
        >
      </span>
    </router-link>
    <router-link
      :to="{ name: 'Meeting', params: { meeting: meeting._id } }"
      class="main__section__card__body"
      v-else
    >
      <span class="main__section__link__text__content">
        <span class="text-title">{{ meeting.name }}</span>
        <span class="text-content"
          >{{ meeting.dateInt.substr(11, 5) }} -
          {{ meeting.dateEnd.substr(11, 5) }}</span
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