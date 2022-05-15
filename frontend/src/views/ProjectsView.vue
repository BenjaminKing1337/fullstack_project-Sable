<template>
    <q-page class="q-pa-xl">
        <h4>Welcome to Projects page</h4>
        <p class="text-subtitle1 q-mb-xl">Here you can create and manage your projects</p>

        <h6>My Projects</h6>
        <q-card class="my-card">
            <q-card-section class="bg-purple text-white">
                <div class="row items-center no-wrap">
                <div class="col">
                    <div class="text-h6">Our Planet</div>
                    <div class="text-subtitle2">by John Doe</div>
                </div>

                <div class="col-auto">
                    <q-btn color="white" round flat icon="more_vert">
                    <q-menu class="overflow-hidden" anchor="center right" self="center left" auto-close fit >
                        <q-list>
                            <q-item clickable>
                                <q-item-section class="flex">Edit</q-item-section>
                                <q-item-section class="flex">
                                    <q-icon size="1.5em" name="edit" />
                                </q-item-section>
                            </q-item>
                            <q-item clickable>
                                <q-item-section>Delete</q-item-section>
                                <q-item-section class="flex">
                                    <q-icon size="1.5em" name="delete" />
                                </q-item-section>
                            </q-item>
                        </q-list>
                    </q-menu>
                    </q-btn>
                </div>
                </div>
            </q-card-section>
            <q-btn class="full-width" label="Open"></q-btn>
        </q-card>
    </q-page>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
.my-card{
    width: 100%;
    max-width: 250px;
}

</style>