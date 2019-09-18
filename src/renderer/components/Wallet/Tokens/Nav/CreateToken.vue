
<template>
  <div>
    <div id="closeBar" />
    <b-container>
      <div class="d-flex justify-content-between modalHeader">
        <h4
          v-t="'tokenCreator'"
          class="mb-auto mt-auto"
        />
        <b-button
          v-b-tooltip.hover
          pill
          variant="outline-primary"
          class="align-top text-white btn-xs"
          :title="$t('closeModal')"
          @click="closeModal"
        >
          <font-awesome-icon
            :icon="['fal','times']"
          />
        </b-button>
      </div>
      <div
        v-if="creatorAccount"
        class="p-5"
      >
        <b-form-group
          label="Issuing Controller"
          label-size="lg"
        >
          <b-input-group size="lg">
            <Multiselect
              id="creatorSelector"
              v-model="creatorAccount"
              class="w-100"
              required
              :allow-empty="false"
              deselect-label="Can't remove this value"
              :tag-placeholder="$t('addThisAccount')"
              track-by="address"
              :custom-label="labelWithAddress"
              :options="localAccounts"
              :multiple="false"
              :disabled="localAccounts.length === 1"
              :placeholder="$t('searchOrAdd')"
            >
              <template
                slot="singleLabel"
                slot-scope="{ option }"
              >
                <span v-if="option.label !== option.address">
                  {{ option.label }}  -
                </span>
                <LogosAddress
                  :inactive="true"
                  :force="true"
                  :address="option.address"
                />
              </template>
            </Multiselect>
          </b-input-group>
        </b-form-group>

        <b-form-group
          id="tokenName"
          label="Token Name"
          label-size="lg"
          description="Token Name must be Alphanumeric and less than or equal to 32 bytes"
        >
          <b-input-group size="lg">
            <b-form-input
              id="nameInput"
              v-model="tokenOptions.name"
              autocomplete="off"
              aria-describedby="nameError"
              :state="validName"
              placeholder="Enter a token name"
            />
            <b-form-invalid-feedback id="nameError">
              This is a required field, must only contain alphanumeric characters, spaces, hyphens, and underscores, and must be less than or equal to 32 bytes
            </b-form-invalid-feedback>
          </b-input-group>
        </b-form-group>

        <b-form-group
          id="tokenSymbol"
          label="Token Symbol"
          label-size="lg"
          description="Token Symbol must be Alphanumeric and less than or equal to 8 bytes"
        >
          <b-input-group size="lg">
            <b-form-input
              id="symbolInput"
              v-model="tokenOptions.symbol"
              autocomplete="off"
              aria-describedby="symbolError"
              :state="validSymbol"
              placeholder="Enter a symbol for your token"
            />
            <b-form-invalid-feedback id="symbolError">
              This is a required field and must be an alphanumeric symbol that is less than or equal to 8 bytes
            </b-form-invalid-feedback>
          </b-input-group>
        </b-form-group>

        <b-form-group
          id="tokenSupply"
          label="Total Supply"
          label-size="lg"
          :description="`Total supply must be between 1 and ${$Utils.MAXUINT128}`"
        >
          <b-input-group size="lg">
            <Multiselect
              id="supplyInput"
              v-model="tokenOptions.totalSupply"
              class="w-100"
              required
              :allow-empty="false"
              deselect-label="Can't remove this value"
              tag-placeholder="Use your own value"
              track-by="label"
              label="label"
              :options="totalSupplyOptions"
              :multiple="false"
              :taggable="true"
              placeholder="Search or add an amount"
              @tag="addTotalSupplyOption"
            >
              <template
                slot="singleLabel"
                slot-scope="{ option }"
              >
                <span v-if="option.label !== option.amount">
                  <strong>{{ option.label }}</strong>  -
                </span>
                {{ option.amount }}
              </template>
            </Multiselect>
            <b-form-invalid-feedback
              v-if="!validSupply"
              id="totalSupplyError"
              style="display:block"
            >
              This is a required field and must be an integer value that is less than or equal to {{ $Utils.MAXUINT128 }}
            </b-form-invalid-feedback>
          </b-input-group>
        </b-form-group>

        <b-form-group
          id="tokenFeeType"
          label="Fee Type"
          label-size="lg"
          description=""
        >
          <b-input-group size="lg">
            <Multiselect
              id="feeTypeInput"
              v-model="tokenOptions.feeType"
              class="w-100"
              :allow-empty="false"
              :searchable="false"
              deselect-label="Can't remove this value"
              :options="feeOptions"
            />
          </b-input-group>
        </b-form-group>

        <b-form-group
          id="tokenFeeRate"
          label="Fee Rate"
          label-size="lg"
          :description="tokenOptions.feeType === 'flat' ? `The flat number of base unit tokens to charge for each token send` : `The percentage to charge in fees for each token send 0%-100%`"
        >
          <b-input-group size="lg">
            <b-form-input
              id="feeRateInput"
              v-model="tokenOptions.feeRate"
              autocomplete="off"
              aria-describedby="rateError"
              :state="validFeeRate"
              placeholder="Enter the fee rate"
            />
            <b-form-invalid-feedback id="rateError">
              This is a required field and must be an integer value that is <span v-if="tokenOptions.feeType === &quot;flat&quot;">less than {{ tokenOptions.totalSupply.amount }}</span><span v-if="tokenOptions.feeType === &quot;percentage&quot;">between 0 - 100</span>
            </b-form-invalid-feedback>
          </b-input-group>
        </b-form-group>

        <b-form-group
          label-size="lg"
          label="Token Settings"
        >
          <b-input-group size="lg">
            <b-form-checkbox
              v-model="tokenOptions.settings.issuance"
              name="Issuance"
              class="w-100 mb-2"
              switch
            >
              Issuance <span
                v-b-tooltip.hover
                :title="`When Issuance is enabled the total suppy can be increased by the token controllers with the issuance privilege after the token is created.`"
              ><font-awesome-icon
                size="sm"
                :icon="['fal','question-circle']"
              /></span>
            </b-form-checkbox>
            <b-form-checkbox
              v-model="tokenOptions.settings.modify_issuance"
              name="Modify Issuance"
              class="w-100 mb-2"
              switch
            >
              Modify Issuance <span
                v-b-tooltip.hover
                :title="`When Modify Issuance is enabled the Issuance setting can be toggled on and off by the token controllers with the modify issuance privilege after the token is created.`"
              ><font-awesome-icon
                size="sm"
                :icon="['fal','question-circle']"
              /></span>
            </b-form-checkbox>
            <b-form-checkbox
              v-model="tokenOptions.settings.revoke"
              name="Revoke"
              class="w-100 mb-2"
              switch
            >
              Revoke <span
                v-b-tooltip.hover
                :title="`When Revoke is enabled token controllers with the revoke privilege can remove tokens from users accounts.`"
              ><font-awesome-icon
                size="sm"
                :icon="['fal','question-circle']"
              /></span>
            </b-form-checkbox>
            <b-form-checkbox
              v-model="tokenOptions.settings.modify_revoke"
              name="Modify Revoke"
              class="w-100 mb-2"
              switch
            >
              Modify Revoke <span
                v-b-tooltip.hover
                :title="`When Modify Revoke is enabled the Revoke setting can be toggled on and off by the token controllers with the modify revoke privilege after the token is created.`"
              ><font-awesome-icon
                size="sm"
                :icon="['fal','question-circle']"
              /></span>
            </b-form-checkbox>
            <b-form-checkbox
              v-model="tokenOptions.settings.freeze"
              name="Freeze"
              class="w-100 mb-2"
              switch
            >
              Freeze <span
                v-b-tooltip.hover
                :title="`When Freeze is enabled token controllers with the freeze privilege can freeze users accounts preventing them from sending or receiving any tokens.`"
              ><font-awesome-icon
                size="sm"
                :icon="['fal','question-circle']"
              /></span>
            </b-form-checkbox>
            <b-form-checkbox
              v-model="tokenOptions.settings.modify_freeze"
              name="Modify Freeze"
              class="w-100 mb-2"
              switch
            >
              Modify Freeze <span
                v-b-tooltip.hover
                :title="`When Modify Freeze is enabled the Freeze setting can be toggled on and off by the token controllers with the modify freeze privilege after the token is created.`"
              ><font-awesome-icon
                size="sm"
                :icon="['fal','question-circle']"
              /></span>
            </b-form-checkbox>
            <b-form-checkbox
              v-model="tokenOptions.settings.adjust_fee"
              name="Adjust Fee"
              class="w-100 mb-2"
              switch
            >
              Adjust Fee <span
                v-b-tooltip.hover
                :title="`When Adjust Fee is enabled token controllers with the adjust fee privilege can adjust the fee rate and type of the token.`"
              ><font-awesome-icon
                size="sm"
                :icon="['fal','question-circle']"
              /></span>
            </b-form-checkbox>
            <b-form-checkbox
              v-model="tokenOptions.settings.modify_adjust_fee"
              name="Modify Adjust Fee"
              class="w-100 mb-2"
              switch
            >
              Modify Adjust Fee <span
                v-b-tooltip.hover
                :title="`When Modify Adjust Fee is enabled the Adjust Fee setting can be toggled on and off by the token controllers with the modify adjust fee privilege after the token is created.`"
              ><font-awesome-icon
                size="sm"
                :icon="['fal','question-circle']"
              /></span>
            </b-form-checkbox>
            <b-form-checkbox
              v-model="tokenOptions.settings.whitelist"
              name="Whitelist"
              class="w-100 mb-2"
              switch
            >
              Whitelist <span
                v-b-tooltip.hover
                :title="`When Whitelist is enabled no one will be able send or receive tokens unless a token controller with the whitelist privilege adds them to the whitelist.`"
              ><font-awesome-icon
                size="sm"
                :icon="['fal','question-circle']"
              /></span>
            </b-form-checkbox>
            <b-form-checkbox
              v-model="tokenOptions.settings.modify_whitelist"
              name="Modify Whitelist"
              class="w-100"
              switch
            >
              Modify Whitelist <span
                v-b-tooltip.hover
                :title="`When Modify Whitelist is enabled the Whitelist setting can be toggled on and off by the token controllers with the modify whitelist privilege after the token is created.`"
              ><font-awesome-icon
                size="sm"
                :icon="['fal','question-circle']"
              /></span>
            </b-form-checkbox>
          </b-input-group>
        </b-form-group>

        <b-form-group
          v-for="(controller, index) in tokenOptions.controllers"
          :key="index"
          label-size="lg"
          :label="`Controller ${index+1} Settings`"
        >
          <div class="controllerGutter">
            <b-form-group
              id="controller"
              :label="`Address`"
              :label-for="`controllerSelector_${index}`"
            >
              <b-input-group size="lg">
                <Multiselect
                  :id="`controllerSelector_${index}`"
                  v-model="controller.account"
                  required
                  class="w-100"
                  tag-placeholder="Add this account"
                  track-by="label"
                  label="label"
                  :options="combinedAccounts"
                  :multiple="false"
                  :taggable="true"
                  :disabled="index === 0"
                  placeholder="Search or add an account"
                  @tag="addAccount"
                >
                  <template
                    slot="singleLabel"
                    slot-scope="{ option }"
                  >
                    <span v-if="option.label !== option.address">
                      <strong>{{ option.label }}</strong>  -
                    </span>
                    <LogosAddress
                      :inactive="true"
                      :force="true"
                      :address="option.address"
                    />
                  </template>
                </Multiselect>
                <b-form-invalid-feedback
                  v-if="!isControllerValid(index)"
                  id="controllerError"
                  style="display:block"
                >
                  This is a required field and must be a valid logos address, no duplicate addresses are allowed
                </b-form-invalid-feedback>
              </b-input-group>
            </b-form-group>

            <b-form-group :label="`Privileges`">
              <b-input-group size="lg">
                <b-form-checkbox
                  v-model="controller.privileges.update_controller"
                  name="Update Controller"
                  class="w-100 mb-2"
                  switch
                >
                  Token Admin <span
                    v-b-tooltip.hover
                    :title="`Token Admins can add, modify, or remove other controllers of this token`"
                  ><font-awesome-icon
                    size="sm"
                    :icon="['fal','question-circle']"
                  /></span>
                </b-form-checkbox>
                <b-form-checkbox
                  v-model="controller.privileges.update_issuer_info"
                  name="Update Issuer Info"
                  class="w-100 mb-2"
                  switch
                >
                  Update Issuer Info <span
                    v-b-tooltip.hover
                    :title="`Issuer Info privilege allows the controller to modify the 512 bytes of additional data allocated for each token`"
                  ><font-awesome-icon
                    size="sm"
                    :icon="['fal','question-circle']"
                  /></span>
                </b-form-checkbox>
                <b-form-checkbox
                  v-model="controller.privileges.burn"
                  name="Burn"
                  class="w-100 mb-2"
                  switch
                >
                  Burn <span
                    v-b-tooltip.hover
                    :title="`Burn allows the controller to reduce the total supply of the token by burning tokens in the token account`"
                  ><font-awesome-icon
                    size="sm"
                    :icon="['fal','question-circle']"
                  /></span>
                </b-form-checkbox>
                <b-form-checkbox
                  v-model="controller.privileges.distribute"
                  :disabled="index === 0"
                  name="Distribute"
                  class="w-100 mb-2"
                  switch
                >
                  Distribute <span
                    v-b-tooltip.hover
                    :title="`Distribute allows the controller to send tokens from the token accounts balance`"
                  ><font-awesome-icon
                    size="sm"
                    :icon="['fal','question-circle']"
                  /></span>
                </b-form-checkbox>
                <b-form-checkbox
                  v-model="controller.privileges.withdraw_fee"
                  name="Withdraw Fee"
                  class="w-100 mb-2"
                  switch
                >
                  Withdraw Fee <span
                    v-b-tooltip.hover
                    :title="`Withdraw Fee allows the controller to withdraw any of the fee's collected by the token`"
                  ><font-awesome-icon
                    size="sm"
                    :icon="['fal','question-circle']"
                  /></span>
                </b-form-checkbox>
                <b-form-checkbox
                  v-model="controller.privileges.withdraw_logos"
                  name="Withdraw Logos"
                  class="w-100 mb-2"
                  switch
                >
                  Withdraw Logos <span
                    v-b-tooltip.hover
                    :title="`Withdraw Logos allows the controller to withdraw any Logos contained in the token account`"
                  ><font-awesome-icon
                    size="sm"
                    :icon="['fal','question-circle']"
                  /></span>
                </b-form-checkbox>
                <b-form-checkbox
                  v-if="tokenOptions.settings.issuance || tokenOptions.settings.modify_issuance"
                  v-model="controller.privileges.issuance"
                  name="Issuance"
                  class="w-100 mb-2"
                  switch
                >
                  Issuance <span
                    v-b-tooltip.hover
                    :title="`Issuance allows the controller to mint new tokens to the token account, increasing the total supply`"
                  ><font-awesome-icon
                    size="sm"
                    :icon="['fal','question-circle']"
                  /></span>
                </b-form-checkbox>
                <b-form-checkbox
                  v-if="tokenOptions.settings.modify_issuance"
                  v-model="controller.privileges.change_issuance"
                  name="Change Issuance"
                  class="w-100 mb-2"
                  switch
                >
                  Change Issuance <span
                    v-b-tooltip.hover
                    :title="`Change Issuance allows the controller to enable or disable issuance for the token`"
                  ><font-awesome-icon
                    size="sm"
                    :icon="['fal','question-circle']"
                  /></span>
                </b-form-checkbox>
                <b-form-checkbox
                  v-if="tokenOptions.settings.modify_issuance"
                  v-model="controller.privileges.change_modify_issuance"
                  name="Change Modify Issuance"
                  class="w-100 mb-2"
                  switch
                >
                  Immute Issuance <span
                    v-b-tooltip.hover
                    :title="`Immute Issuance will lock the current issuance setting and make it permanent`"
                  ><font-awesome-icon
                    size="sm"
                    :icon="['fal','question-circle']"
                  /></span>
                </b-form-checkbox>
                <b-form-checkbox
                  v-if="tokenOptions.settings.revoke || tokenOptions.settings.modify_revoke"
                  v-model="controller.privileges.revoke"
                  name="Revoke"
                  class="w-100 mb-2"
                  switch
                >
                  Revoke <span
                    v-b-tooltip.hover
                    :title="`Revoke allows the controller to remove tokens from any users account and send them to a different destination`"
                  ><font-awesome-icon
                    size="sm"
                    :icon="['fal','question-circle']"
                  /></span>
                </b-form-checkbox>
                <b-form-checkbox
                  v-if="tokenOptions.settings.modify_revoke"
                  v-model="controller.privileges.change_revoke"
                  name="Change Revoke"
                  class="w-100 mb-2"
                  switch
                >
                  Change Revoke <span
                    v-b-tooltip.hover
                    :title="`Change Revoke allows the controller to enable or disable revoke for the token`"
                  ><font-awesome-icon
                    size="sm"
                    :icon="['fal','question-circle']"
                  /></span>
                </b-form-checkbox>
                <b-form-checkbox
                  v-if="tokenOptions.settings.modify_revoke"
                  v-model="controller.privileges.change_modify_revoke"
                  name="Modify Revoke"
                  class="w-100 mb-2"
                  switch
                >
                  Immute Revoke <span
                    v-b-tooltip.hover
                    :title="`Immute Revoke will lock the current revoke setting and make it permanent`"
                  ><font-awesome-icon
                    size="sm"
                    :icon="['fal','question-circle']"
                  /></span>
                </b-form-checkbox>
                <b-form-checkbox
                  v-if="tokenOptions.settings.freeze || tokenOptions.settings.modify_freeze"
                  v-model="controller.privileges.freeze"
                  name="Freeze"
                  class="w-100 mb-2"
                  switch
                >
                  Freeze <span
                    v-b-tooltip.hover
                    :title="`Freeze allows the controller to freeze any account which will prevent them from sending or receiving this token`"
                  ><font-awesome-icon
                    size="sm"
                    :icon="['fal','question-circle']"
                  /></span>
                </b-form-checkbox>
                <b-form-checkbox
                  v-if="tokenOptions.settings.modify_freeze"
                  v-model="controller.privileges.change_freeze"
                  name="Change Freeze"
                  class="w-100 mb-2"
                  switch
                >
                  Change Freeze <span
                    v-b-tooltip.hover
                    :title="`Change Freeze allows the controller to enable or disable account freezing for the token`"
                  ><font-awesome-icon
                    size="sm"
                    :icon="['fal','question-circle']"
                  /></span>
                </b-form-checkbox>
                <b-form-checkbox
                  v-if="tokenOptions.settings.modify_freeze"
                  v-model="controller.privileges.change_modify_freeze"
                  name="Modify Freeze"
                  class="w-100 mb-2"
                  switch
                >
                  Immute Freeze <span
                    v-b-tooltip.hover
                    :title="`Immute Freeze will lock the current freeze setting and make it permanent`"
                  ><font-awesome-icon
                    size="sm"
                    :icon="['fal','question-circle']"
                  /></span>
                </b-form-checkbox>
                <b-form-checkbox
                  v-if="tokenOptions.settings.adjust_fee || tokenOptions.settings.modify_adjust_fee"
                  v-model="controller.privileges.adjust_fee"
                  name="Adjust Fee"
                  class="w-100 mb-2"
                  switch
                >
                  Adjust Fee <span
                    v-b-tooltip.hover
                    :title="`Adjust Fee allows the controller to adjust the fee type and fee rate of the token`"
                  ><font-awesome-icon
                    size="sm"
                    :icon="['fal','question-circle']"
                  /></span>
                </b-form-checkbox>
                <b-form-checkbox
                  v-if="tokenOptions.settings.modify_adjust_fee"
                  v-model="controller.privileges.change_adjust_fee"
                  name="Change Adjust Fee"
                  class="w-100 mb-2"
                  switch
                >
                  Change Adjust Fee <span
                    v-b-tooltip.hover
                    :title="`Change Adjust Fee allows the controller to enable or disable the ability to adjust fees for the token`"
                  ><font-awesome-icon
                    size="sm"
                    :icon="['fal','question-circle']"
                  /></span>
                </b-form-checkbox>
                <b-form-checkbox
                  v-if="tokenOptions.settings.modify_adjust_fee"
                  v-model="controller.privileges.change_modify_adjust_fee"
                  name="Modify Adjust Fee"
                  class="w-100 mb-2"
                  switch
                >
                  Immute Adjust Fee <span
                    v-b-tooltip.hover
                    :title="`Immute Adjust Fee will lock the current adjust fee setting and make it permanent`"
                  ><font-awesome-icon
                    size="sm"
                    :icon="['fal','question-circle']"
                  /></span>
                </b-form-checkbox>
                <b-form-checkbox
                  v-if="tokenOptions.settings.whitelist || tokenOptions.settings.modify_whitelist"
                  v-model="controller.privileges.whitelist"
                  name="Whitelist"
                  class="w-100 mb-2"
                  switch
                >
                  Whitelist <span
                    v-b-tooltip.hover
                    :title="`Whitelist allows the controller to whitelist or un-whitelist any account for this token`"
                  ><font-awesome-icon
                    size="sm"
                    :icon="['fal','question-circle']"
                  /></span>
                </b-form-checkbox>
                <b-form-checkbox
                  v-if="tokenOptions.settings.modify_whitelist"
                  v-model="controller.privileges.change_whitelist"
                  name="Change Whitelist"
                  class="w-100 mb-2"
                  switch
                >
                  Change Whitelist <span
                    v-b-tooltip.hover
                    :title="`Change Whitelist allows the controller to enable or disable the whitelist for the token`"
                  ><font-awesome-icon
                    size="sm"
                    :icon="['fal','question-circle']"
                  /></span>
                </b-form-checkbox>
                <b-form-checkbox
                  v-if="tokenOptions.settings.modify_whitelist"
                  v-model="controller.privileges.change_modify_whitelist"
                  name="Modify Whitelist"
                  class="w-100"
                  switch
                >
                  Immute Whitelist <span
                    v-b-tooltip.hover
                    :title="`Immute Whitelist will lock the current whitelist setting and make it permanent`"
                  ><font-awesome-icon
                    size="sm"
                    :icon="['fal','question-circle']"
                  /></span>
                </b-form-checkbox>
              </b-input-group>
            </b-form-group>
          </div>
        </b-form-group>
        <div class="text-center">
          <b-button
            v-if="tokenOptions.controllers.length < 10"
            variant="primary"
            @click="addController"
          >
            Add Another Controller
          </b-button>
          <b-button
            v-if="tokenOptions.controllers.length > 1"
            variant="danger"
            class="ml-3"
            @click="removeController"
          >
            Remove Last Controller
          </b-button>
        </div>

        <b-form-group
          class="mt-3"
          label-size="lg"
          :label="`Optional Issuer Info Parameters`"
        >
          <b-form-group
            id="tokenDecimals"
            label="Token Decimals"
            :description="decimalDescription"
          >
            <b-input-group size="lg">
              <b-form-input
                id="tokenDecimalsInput"
                v-model="tokenOptions.totalSupply.decimals"
                autocomplete="off"
                aria-describedby="decimalError"
                :state="validDecimal"
                placeholder="Enter the decimal value of the display unit"
              />
              <b-form-invalid-feedback id="decimalError">
                Optional, must be an integer value
              </b-form-invalid-feedback>
            </b-input-group>
          </b-form-group>

          <b-form-group
            id="tokenImage"
            label="Token Image"
            :description="`Optionally provide a url to small 128x128 image to be your default icon`"
          >
            <b-input-group size="lg">
              <b-form-input
                id="tokenImageInput"
                v-model="issuerInfo.image"
                autocomplete="off"
                placeholder="Enter image url"
                aria-describedby="imageError"
                :state="validImage"
              />
              <b-form-invalid-feedback id="imageError">
                Must be a valid URL
              </b-form-invalid-feedback>
            </b-input-group>
          </b-form-group>

          <b-form-group
            id="tokenWebsite"
            label="Token Website"
            :description="`Optionally provide a website url to let people learn more about your token`"
          >
            <b-input-group size="lg">
              <b-form-input
                id="websiteInput"
                v-model="issuerInfo.website"
                autocomplete="off"
                placeholder="Enter Website URL"
                aria-describedby="urlError"
                :state="validURL"
              />
              <b-form-invalid-feedback id="urlError">
                Must be a valid URL
              </b-form-invalid-feedback>
            </b-input-group>
          </b-form-group>
        </b-form-group>
        <div class="text-right">
          <b-button
            :disabled="!validName ||
              !validSymbol ||
              !validSupply ||
              !validFeeRate ||
              !validControllers ||
              validDecimal === false ||
              validImage === false ||
              validURL === false"
            type="submit"
            variant="primary"
            @click="createToken()"
          >
            Create Token
          </b-button>
        </div>
      </div>
      <div
        v-else
        class="pt-5"
      >
        <p>None of your accounts have enough funds to create a token!</p>
      </div>
    </b-container>
  </div>
</template>

<script>
import bigInt from 'big-integer'
import { mapState, mapActions } from 'vuex'
const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/
export default {
  name: 'CreateToken',
  components: {
    Multiselect: () => import(/* webpackChunkName: "Multiselect" */'vue-multiselect'),
    LogosAddress: () => import(/* webpackChunkName: "LogosAddress" */'@/components/Shared/LogosAddress.vue')
  },
  data () {
    return {
      creatorAccount: null,
      accounts: [],
      issuerInfo: {
        image: '',
        website: ''
      },
      emptyController: {
        account: null,
        privileges: {
          change_issuance: false,
          change_modify_issuance: false,
          change_revoke: false,
          change_modify_revoke: false,
          change_freeze: false,
          change_modify_freeze: false,
          change_adjust_fee: false,
          change_modify_adjust_fee: false,
          change_whitelist: false,
          change_modify_whitelist: false,
          issuance: false,
          revoke: false,
          freeze: false,
          adjust_fee: false,
          whitelist: false,
          update_issuer_info: false,
          update_controller: false,
          burn: false,
          distribute: false,
          withdraw_fee: false,
          withdraw_logos: false
        }
      },
      totalSupplyOptions: [
        {
          label: 'Logos',
          amount: this.$Utils.MAXUINT128,
          decimals: 30
        },
        {
          label: 'Bitcoin',
          amount: '2100000000000000',
          decimals: 8
        },
        {
          label: 'Litecoin',
          amount: '8400000000000000',
          decimals: 8
        },
        {
          label: 'Ripple',
          amount: '100000000000000000',
          decimals: 6
        },
        {
          label: 'IOTA',
          amount: '2779530283000000',
          decimals: 6
        },
        {
          label: 'Maker',
          amount: '1000000000000000000000000',
          decimals: 18
        }
      ],
      feeOptions: ['flat', 'percentage'],
      tokenOptions: {
        name: 'MyCoin',
        symbol: 'MYC',
        totalSupply: {
          label: 'Logos',
          amount: this.$Utils.MAXUINT128,
          decimals: 30
        },
        feeType: 'flat',
        feeRate: '0',
        settings: {
          issuance: false,
          modify_issuance: false,
          revoke: false,
          modify_revoke: false,
          freeze: false,
          modify_freeze: false,
          adjust_fee: false,
          modify_adjust_fee: false,
          whitelist: false,
          modify_whitelist: false
        },
        controllers: [{
          account: this.currentAccount,
          privileges: {
            change_issuance: false,
            change_modify_issuance: false,
            change_revoke: false,
            change_modify_revoke: false,
            change_freeze: false,
            change_modify_freeze: false,
            change_adjust_fee: false,
            change_modify_adjust_fee: false,
            change_whitelist: false,
            change_modify_whitelist: false,
            issuance: false,
            revoke: false,
            freeze: false,
            adjust_fee: false,
            whitelist: false,
            update_issuer_info: false,
            update_controller: false,
            burn: false,
            distribute: true,
            withdraw_fee: false,
            withdraw_logos: false
          }
        }],
        issuerInfo: ''
      }
    }
  },
  computed: {
    ...mapState('Wallet', {
      activeAddress: state => state.activeAddress,
      contacts: state => state.contacts
    }),
    localAccounts () {
      const results = []
      for (const address in this.$Wallet.accounts) {
        if (bigInt(this.$Wallet.accounts[address].balance).greaterOrEquals(bigInt(this.$Utils.minimumFee))) {
          results.push({
            label: `${this.$Wallet.accounts[address].label}`,
            address: address
          })
        }
      }
      return results
    },
    currentAccount () {
      return this.$Wallet.account
    },
    combinedAccounts () {
      const results = []
      const map = new Map()
      map.set(this.creatorAccount.address, true)
      for (const controller of this.tokenOptions.controllers) {
        if (controller.account) {
          map.set(controller.account.address, true)
        }
      }
      for (const address in this.$Wallet.accounts) {
        if (!map.has(address)) {
          map.set(address, true)
          results.push({
            label: `${this.$Wallet.accounts[address].label}`,
            address: address
          })
        }
      }
      for (const contact of this.contacts) {
        if (!map.has(contact.address)) {
          map.set(contact.address, true)
          results.push({
            label: contact.label,
            address: contact.address
          })
        }
      }
      return results
    },
    validName () {
      return this.$Utils.isAlphanumericExtended(this.tokenOptions.name) && this.$Utils.byteCount(this.tokenOptions.name) <= 32
    },
    validSymbol () {
      return this.$Utils.isAlphanumeric(this.tokenOptions.symbol) && this.$Utils.byteCount(this.tokenOptions.symbol) <= 8
    },
    validSupply () {
      return bigInt(this.tokenOptions.totalSupply.amount).lesserOrEquals(bigInt(this.$Utils.MAXUINT128))
    },
    validFeeRate () {
      if (!/^([0-9]+)$/.test(this.tokenOptions.feeRate)) return false
      if (this.tokenOptions.feeType === 'percentage' && bigInt(this.feeRate).lesserOrEquals(bigInt('100'))) {
        return true
      } else if (this.tokenOptions.feeType === 'flat' && bigInt(this.feeRate).lesserOrEquals(bigInt(this.tokenOptions.totalSupply.amount))) {
        return true
      }
      return false
    },
    validDecimal () {
      if (this.tokenOptions.totalSupply.decimals === '') return null
      return /^([0-9]+)$/.test(this.tokenOptions.totalSupply.decimals)
    },
    validImage () {
      if (this.issuerInfo.image === '') return null
      return urlRegex.test(this.issuerInfo.image)
    },
    validURL () {
      if (this.issuerInfo.website === '') return null
      return urlRegex.test(this.issuerInfo.website)
    },
    validControllers () {
      const accounts = []
      for (const controller of this.tokenOptions.controllers) {
        if (!controller.account) return false
        if (/^lgs_[13456789abcdefghijkmnopqrstuwxyz]{60}$/.test(controller.account.address)) {
          if (accounts.includes(controller.account.address)) {
            return false
          } else {
            accounts.push(controller.account.address)
          }
        } else {
          return false
        }
      }
      return true
    },
    decimalDescription () {
      if (this.validDecimal) {
        return `With the decimial set to ${this.tokenOptions.totalSupply.decimals} the total supply will be ${this.$Wallet.rpcClient.convert.fromTo(this.tokenOptions.totalSupply.amount, 0, this.tokenOptions.totalSupply.decimals)} ${this.tokenOptions.symbol}`
      } else {
        return `With no decimial set the total supply will be ${this.tokenOptions.totalSupply.amount} ${this.tokenOptions.symbol}`
      }
    }
  },
  watch: {
    creatorAccount (oldAccount, newAccount) {
      this.tokenOptions.controllers[0].account = this.$Wallet.accounts[this.creatorAccount.address]
    }
  },
  created () {
    this.tokenOptions.controllers[0].account = this.currentAccount
    if (bigInt(this.currentAccount.balance).greaterOrEquals(bigInt(this.$Utils.minimumFee))) {
      this.creatorAccount = {
        label: `${this.currentAccount.label}`,
        address: this.currentAccount.address
      }
    } else if (this.localAccounts.length > 0) {
      this.creatorAccount = this.localAccounts[0]
    }
  },
  methods: {
    ...mapActions('Wallet', [
      'addContact'
    ]),
    isControllerValid (index) {
      const accounts = []
      for (let i = 0; i < this.tokenOptions.controllers.length; i++) {
        if (!this.tokenOptions.controllers[i].account) {
          if (i === index) return false
        } else if (/^lgs_[13456789abcdefghijkmnopqrstuwxyz]{60}$/.test(this.tokenOptions.controllers[i].account.address)) {
          if (accounts.includes(this.tokenOptions.controllers[i].account.address) && i === index) {
            return false
          } else {
            accounts.push(this.tokenOptions.controllers[i].account.address)
          }
        } else if (i === index) {
          return false
        }
      }
      return true
    },
    addAccount (newAddress, id) {
      const controllerIndex = parseInt(id.split('_')[1])
      try {
        this.$Utils.keyFromAccount(newAddress)
        const newAccount = { label: newAddress, address: newAddress }
        const map = new Map()
        map.set(this.creatorAccount.address, true)
        for (const controller of this.tokenOptions.controllers) {
          if (controller.account) {
            map.set(controller.account.address, true)
          }
        }
        for (const account of this.combinedAccounts) {
          map.set(account.address, true)
        }
        if (!map.has(newAddress)) {
          this.addContact(newAccount)
        }
        this.tokenOptions.controllers[controllerIndex].account = newAccount
      } catch (err) {
        console.log(err)
      }
    },
    findAccount (newAddress) {
      return this.combinedAccounts.find((account) => {
        return account.address === newAddress
      })
    },
    addTotalSupplyOption (amount) {
      if (bigInt(amount).lesserOrEquals(bigInt(this.$Utils.MAXUINT128)) &&
        bigInt(amount).greaterOrEquals(bigInt('1'))) {
        const newAmount = { label: amount, amount: amount, decimals: 0 }
        this.totalSupplyOptions.push(newAmount)
        this.tokenOptions.totalSupply = newAmount
      }
    },
    addController () {
      this.tokenOptions.controllers.push({ ...this.emptyController })
      if (this.combinedAccounts.length > 0) {
        this.tokenOptions.controllers[this.tokenOptions.controllers.length - 1].account = this.combinedAccounts[0]
      }
    },
    removeController () {
      this.tokenOptions.controllers.pop()
    },
    createToken () {
      const tokenOptions = { ...this.tokenOptions }
      const issuerInfo = { ...this.issuerInfo }
      issuerInfo.decimals = tokenOptions.totalSupply.decimals
      tokenOptions.issuerInfo = JSON.stringify(issuerInfo)
      tokenOptions.totalSupply = tokenOptions.totalSupply.amount
      tokenOptions.controllers.forEach((controller) => {
        controller.account = controller.account.address
      })
      this.$Wallet.accounts[this.creatorAccount.address].createTokenIssuanceRequest(tokenOptions)
      this.$Wallet.ResetWalletReactivity()
      this.closeModal()
    },
    labelWithAddress ({ label, address }) {
      if (label !== address) {
        return `${label} — ${address.substring(0, 9)}...${address.substring(59, 64)}`
      } else {
        return `${address.substring(0, 9)}...${address.substring(59, 64)}`
      }
    },
    closeModal () {
      this.$bvModal.hide('createToken')
    }
  }
}
</script>
<style scoped lang="scss">
@media (min-width: 576px) {
  .controllerGutter {
    margin-left: 1.5rem;
  }
  .modalHeader {
    position: fixed;
    top: 0;
    padding-top: calc(1rem + 8px);
    padding-bottom: 1rem;
    left: 2rem;
    z-index: 3;
    width: calc(100% - 4rem);
    background-color: theme-color("secondary");
  }
}
</style>
