const ResponsesTypes = require("./responseTypes");

class ResponseParser {
  constructor({ model, documents, request, totalDocuments }) {
    this.model = model ?? null;
    this.documents = documents ?? null;
    this.totalDocuments = totalDocuments ?? null;
    this.fieldsToSelect = model?.getFieldsToSelect() ?? null;
    this.entityName = model?.getEntity() ?? null;
    this.request = request ?? null;
    this.query = request?.query ?? {};
    this.pageNumber = request?.query?.page?.number ?? null;
    this.pageSize = request?.query?.page?.size ?? null;
    this.response = {};
  }

  getSelectedAttributes = document => {
    const attributes = {};

    for (const key in document) {
      if (this.fieldsToSelect.includes(key)) {
        attributes[key] = document[key];
      }
    }

    return attributes;
  };

  parseDataCollection() {
    const getOriginalUrlFiltered = () => {
      const originalUrl = this.request.originalUrl;
      const [urlBase, urlQuery] = originalUrl.split("?");
      const urlQueryFiltered = urlQuery
        .split("&")
        .filter(query => {
          return !/page/.test(query);
        })
        .join("&");

      const result =
        urlQueryFiltered.length > 0
          ? `${process.env.CLIENT_BASE_URL}${urlBase}?${urlQueryFiltered}&`
          : `${process.env.CLIENT_BASE_URL}${urlBase}?${urlQueryFiltered}`;

      return result;
    };

    const getLinks = () => {
      if (!this.pageSize && !this.pageNumber) {
        return {
          self: `${process.env.CLIENT_BASE_URL}${this.request.originalUrl}`,
        };
      }

      const originalUrlFiltered = getOriginalUrlFiltered();

      const links = {};
      const totalPages = Math.ceil(this.totalDocuments / this.pageSize);
      let currentPage = parseInt(this.pageNumber);

      if (currentPage < 1) {
        currentPage = 1;
      } else if (currentPage > totalPages && totalPages > 0) {
        currentPage = totalPages;
      }

      const firstPage = 1;
      const prevPage = currentPage - 1;
      const nextPage = currentPage + 1;

      if (currentPage === 2 && totalPages !== 0) {
        links.prev = `${originalUrlFiltered}page%5Bnumber%5D=${prevPage}&page%5Bsize%5D=${this.pageSize}`;
      } else if (currentPage >= 3 && totalPages !== 0) {
        links.first = `${originalUrlFiltered}page%5Bnumber%5D=${firstPage}&page%5Bsize%5D=${this.pageSize}`;
        links.prev = `${originalUrlFiltered}page%5Bnumber%5D=${prevPage}&page%5Bsize%5D=${this.pageSize}`;
      }

      links.self = `${originalUrlFiltered}page%5Bnumber%5D=${currentPage}&page%5Bsize%5D=${this.pageSize}`;

      if (currentPage <= totalPages - 2) {
        links.next = `${originalUrlFiltered}page%5Bnumber%5D=${nextPage}&page%5Bsize%5D=${this.pageSize}`;
        links.last = `${originalUrlFiltered}page%5Bnumber%5D=${totalPages}&page%5Bsize%5D=${this.pageSize}`;
      } else if (currentPage <= totalPages - 1) {
        links.next = `${originalUrlFiltered}page%5Bnumber%5D=${nextPage}&page%5Bsize%5D=${this.pageSize}`;
      }

      return links;
    };

    this.response = {
      links: getLinks(),
      api: {
        items_total: this.totalDocuments ?? 0,
      },
      data: [],
    };

    this.documents.forEach(async document => {
      this.response.data.push({
        type: this.entityName,
        uuid: document.uuid,
        attributes: this.getSelectedAttributes(document),
        links: {
          self: `${process.env.CLIENT_API_BASE_URL}/${this.entityName}/${document.uuid}`,
        },
      });
    });
  }

  parseDataIndividual() {
    this.response = {
      links: {
        self: `${process.env.CLIENT_API_BASE_URL}/${this.entityName}/${this.documents.uuid}`,
      },
      data: {
        type: this.entityName,
        uuid: this.documents.uuid,
        attributes: this.getSelectedAttributes(this.documents)
      },
    };
  }

  sendResponseCreateSuccess(res) {
    return res
      .status(
        ResponsesTypes.success.success_200.success_resource_created_success
          .httpStatusCode
      )
      .json(this.response);
  }

  sendResponseGetSuccess(res) {
    return res
      .status(
        ResponsesTypes.success.success_200.success_resource_get_success
          .httpStatusCode
      )
      .json(this.response);
  }

  sendResponseUpdateSuccess(res) {
    return res
      .status(
        ResponsesTypes.success.success_200.success_resource_updated_success
          .httpStatusCode
      )
      .json(this.response);
  }

  sendResponseDeleteSuccess(res) {
    return res
      .status(ResponsesTypes.success.success_200.success_resource_deleted_success.httpStatusCode)
      .json();
  }

  sendResponseResetPasswordSuccess(res) {
    return res
      .status(
        ResponsesTypes.success.success_200.success_reset_password_success
          .httpStatusCode
      )
      .json();
  }

  sendResponseUserRegisterSuccess(res) {
    return res
      .status(
        ResponsesTypes.success.success_200.success_user_register_success
          .httpStatusCode
      )
      .json();
  }
}

module.exports = ResponseParser;
